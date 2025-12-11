import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import { getAppointments } from '../lib/storage';
import VideoEditModal from '../components/VideoEditModal';

export default function Admin() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState('bookings');
    const [appointments, setAppointments] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [healthPackageBookings, setHealthPackageBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    const [videos, setVideos] = useState([]);
    const [videoSettings, setVideoSettings] = useState({
        section_title: '',
        section_subtitle: '',
        section_description: ''
    });
    const [videoForm, setVideoForm] = useState({
        title: '',
        description: '',
        video_url: '',
        category: 'General',
        display_order: 0,
        published: true
    });
    const [editingVideo, setEditingVideo] = useState(null);
    const [showVideoEditModal, setShowVideoEditModal] = useState(false);

    // Blog form state
    const [blogForm, setBlogForm] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: 'health',
        author: '',
        image_url: '',
        video_url: '',
        published: true
    });

    // Doctor form state
    const [doctorForm, setDoctorForm] = useState({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        department: '',
        qualification: '',
        experience: '',
        about: '',
        image_url: '',
        available: true,
        consultation_fee: ''
    });

    useEffect(() => {
        if (activeTab === 'bookings') {
            loadAppointments();
        } else if (activeTab === 'blogs') {
            loadBlogPosts();
        } else if (activeTab === 'doctors') {
            loadDoctors();
        } else if (activeTab === 'videos') {
            loadVideos();
            loadVideoSettings();
        } else if (activeTab === 'package-bookings') {
            loadHealthPackageBookings();
        }
    }, [activeTab]);

    const [uploadingImage, setUploadingImage] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Edit states
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [editingBlog, setEditingBlog] = useState(null);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showBlogEditModal, setShowBlogEditModal] = useState(false);
    const [showDoctorEditModal, setShowDoctorEditModal] = useState(false);

    // Authentication check
    useEffect(() => {
        const checkAuth = () => {
            const isAuth = sessionStorage.getItem('adminAuthenticated');
            const loginTime = sessionStorage.getItem('adminLoginTime');

            if (!isAuth || isAuth !== 'true') {
                router.push('/admin-login');
                return;
            }

            // Check if session is older than 24 hours
            if (loginTime) {
                const currentTime = new Date().getTime();
                const timeDiff = currentTime - parseInt(loginTime);
                const hoursDiff = timeDiff / (1000 * 60 * 60);

                if (hoursDiff > 24) {
                    handleLogout();
                    return;
                }
            }

            setIsAuthenticated(true);
        };

        checkAuth();
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuthenticated');
        sessionStorage.removeItem('adminLoginTime');
        router.push('/admin-login');
    };

    useEffect(() => {
        if (activeTab === 'bookings') {
            loadAppointments();
        } else if (activeTab === 'blogs') {
            loadBlogPosts();
        } else if (activeTab === 'doctors') {
            loadDoctors();
        }
    }, [activeTab]);

    const loadAppointments = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('appointments')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setAppointments(data || []);
        } catch (error) {
            console.error('Error loading appointments:', error);
            // Fallback to in-memory storage
            const fallbackData = getAppointments();
            setAppointments(fallbackData);
        } finally {
            setLoading(false);
        }
    };

    const loadBlogPosts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBlogPosts(data || []);
        } catch (error) {
            console.error('Error loading blog posts:', error);
            showMessage('error', 'Failed to load blog posts');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploadingImage(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `blog-images/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('blog-media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('blog-media')
                .getPublicUrl(filePath);

            setBlogForm({ ...blogForm, image_url: data.publicUrl });
            showMessage('success', 'Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            showMessage('error', 'Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Convert video URL to embed format if needed
            const convertedVideoUrl = convertToEmbedUrl(blogForm.video_url);

            const { data, error } = await supabase
                .from('blog_posts')
                .insert([{ ...blogForm, video_url: convertedVideoUrl }])
                .select();

            if (error) throw error;

            showMessage('success', 'Blog post created successfully!');
            setBlogForm({
                title: '',
                content: '',
                excerpt: '',
                category: 'health',
                author: '',
                image_url: '',
                video_url: '',
                published: true
            });
            loadBlogPosts();
        } catch (error) {
            console.error('Error creating blog post:', error);
            showMessage('error', 'Failed to create blog post');
        } finally {
            setLoading(false);
        }
    };

    // Helper function to convert YouTube/Vimeo URLs to embed format
    const convertToEmbedUrl = (url) => {
        if (!url) return '';

        // YouTube patterns
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const youtubeMatch = url.match(youtubeRegex);
        if (youtubeMatch && youtubeMatch[1]) {
            return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
        }

        // Vimeo patterns
        const vimeoRegex = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
        const vimeoMatch = url.match(vimeoRegex);
        if (vimeoMatch && vimeoMatch[3]) {
            return `https://player.vimeo.com/video/${vimeoMatch[3]}`;
        }

        // If already in embed format or unknown format, return as is
        return url;
    };

    const deleteBlogPost = async (id) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            const { error } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', id);

            if (error) throw error;

            showMessage('success', 'Blog post deleted successfully!');
            loadBlogPosts();
        } catch (error) {
            console.error('Error deleting blog post:', error);
            showMessage('error', 'Failed to delete blog post');
        }
    };

    const togglePublish = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('blog_posts')
                .update({ published: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            showMessage('success', 'Post status updated!');
            loadBlogPosts();
        } catch (error) {
            console.error('Error updating post:', error);
            showMessage('error', 'Failed to update post');
        }
    };

    // Appointment management functions
    const openEditAppointment = (appointment) => {
        setEditingAppointment(appointment);
        setShowEditModal(true);
    };

    const updateAppointment = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { error } = await supabase
                .from('appointments')
                .update({
                    date: editingAppointment.date,
                    time: editingAppointment.time,
                    status: editingAppointment.status,
                    reason: editingAppointment.reason,
                    updated_at: new Date().toISOString()
                })
                .eq('id', editingAppointment.id);

            if (error) throw error;

            // Send notification email
            await fetch('/api/appointments/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    appointment: editingAppointment,
                    action: 'updated'
                })
            });

            showMessage('success', 'Appointment updated and patient notified!');
            setShowEditModal(false);
            setEditingAppointment(null);
            loadAppointments();
        } catch (error) {
            console.error('Error updating appointment:', error);
            showMessage('error', 'Failed to update appointment');
        } finally {
            setLoading(false);
        }
    };

    const cancelAppointment = async (id, patientEmail, patientName) => {
        if (!confirm('Are you sure you want to cancel this appointment?')) return;

        try {
            const { error } = await supabase
                .from('appointments')
                .update({ status: 'cancelled', updated_at: new Date().toISOString() })
                .eq('id', id);

            if (error) throw error;

            // Send cancellation email
            await fetch('/api/appointments/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    appointment: { patient_email: patientEmail, patient_name: patientName },
                    action: 'cancelled'
                })
            });

            showMessage('success', 'Appointment cancelled and patient notified!');
            loadAppointments();
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            showMessage('error', 'Failed to cancel appointment');
        }
    };

    // Blog edit functions
    const openEditBlog = (post) => {
        setEditingBlog(post);
        setShowBlogEditModal(true);
    };

    const updateBlogPost = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Convert video URL to embed format if needed
            const convertedVideoUrl = convertToEmbedUrl(editingBlog.video_url);

            const { error } = await supabase
                .from('blog_posts')
                .update({
                    title: editingBlog.title,
                    content: editingBlog.content,
                    excerpt: editingBlog.excerpt,
                    category: editingBlog.category,
                    author: editingBlog.author,
                    video_url: convertedVideoUrl,
                    published: editingBlog.published,
                    updated_at: new Date().toISOString()
                })
                .eq('id', editingBlog.id);

            if (error) throw error;

            showMessage('success', 'Blog post updated successfully!');
            setShowBlogEditModal(false);
            setEditingBlog(null);
            loadBlogPosts();
        } catch (error) {
            console.error('Error updating blog:', error);
            showMessage('error', 'Failed to update blog post');
        } finally {
            setLoading(false);
        }
    };

    // Doctor management functions
    const loadDoctors = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('doctors')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setDoctors(data || []);
        } catch (error) {
            console.error('Error loading doctors:', error);
            showMessage('error', 'Failed to load doctors');
        } finally {
            setLoading(false);
        }
    };

    const handleDoctorSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('doctors')
                .insert([{
                    ...doctorForm,
                    consultation_fee: parseInt(doctorForm.consultation_fee) || 0
                }])
                .select();

            if (error) throw error;

            showMessage('success', 'Doctor added successfully!');
            setDoctorForm({
                name: '',
                email: '',
                phone: '',
                specialization: '',
                department: '',
                qualification: '',
                experience: '',
                about: '',
                image_url: '',
                available: true,
                consultation_fee: ''
            });
            loadDoctors();
        } catch (error) {
            console.error('Error adding doctor:', error);
            showMessage('error', 'Failed to add doctor');
        } finally {
            setLoading(false);
        }
    };

    const deleteDoctor = async (id) => {
        if (!confirm('Are you sure you want to delete this doctor?')) return;

        try {
            const { error } = await supabase
                .from('doctors')
                .delete()
                .eq('id', id);

            if (error) throw error;

            showMessage('success', 'Doctor deleted successfully!');
            loadDoctors();
        } catch (error) {
            console.error('Error deleting doctor:', error);
            showMessage('error', 'Failed to delete doctor');
        }
    };

    const toggleDoctorAvailability = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('doctors')
                .update({ available: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            showMessage('success', 'Doctor availability updated!');
            loadDoctors();
        } catch (error) {
            console.error('Error updating doctor:', error);
            showMessage('error', 'Failed to update doctor');
        }
    };

    const openEditDoctor = (doctor) => {
        setEditingDoctor(doctor);
        setShowDoctorEditModal(true);
    };

    const updateDoctor = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { error } = await supabase
                .from('doctors')
                .update({
                    name: editingDoctor.name,
                    email: editingDoctor.email,
                    phone: editingDoctor.phone,
                    specialization: editingDoctor.specialization,
                    department: editingDoctor.department,
                    qualification: editingDoctor.qualification,
                    experience: editingDoctor.experience,
                    about: editingDoctor.about,
                    image_url: editingDoctor.image_url,
                    available: editingDoctor.available,
                    consultation_fee: parseInt(editingDoctor.consultation_fee) || 0,
                    updated_at: new Date().toISOString()
                })
                .eq('id', editingDoctor.id);

            if (error) throw error;

            showMessage('success', 'Doctor updated successfully!');
            setShowDoctorEditModal(false);
            setEditingDoctor(null);
            loadDoctors();
        } catch (error) {
            console.error('Error updating doctor:', error);
            showMessage('error', 'Failed to update doctor');
        } finally {
            setLoading(false);
        }
    };

    const handleDoctorImageUpload = async (e, isEditing = false) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            showMessage('error', 'Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showMessage('error', 'Image size should be less than 5MB');
            return;
        }

        try {
            setUploadingImage(true);

            // Create unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `doctor-${Date.now()}.${fileExt}`;
            const filePath = `doctors/${fileName}`;

            // Upload to Supabase storage
            const { error: uploadError } = await supabase.storage
                .from('blog-media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data } = supabase.storage
                .from('blog-media')
                .getPublicUrl(filePath);

            const imageUrl = data.publicUrl;

            // Update form state
            if (isEditing) {
                setEditingDoctor({ ...editingDoctor, image_url: imageUrl });
            } else {
                setDoctorForm({ ...doctorForm, image_url: imageUrl });
            }

            showMessage('success', 'Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            showMessage('error', 'Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    // Health Package Bookings Management Functions
    const loadHealthPackageBookings = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('health_package_bookings')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setHealthPackageBookings(data || []);
        } catch (error) {
            console.error('Error loading health package bookings:', error);
            showMessage('error', 'Failed to load health package bookings');
        } finally {
            setLoading(false);
        }
    };

    const updateBookingStatus = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('health_package_bookings')
                .update({
                    status: newStatus,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id);

            if (error) throw error;

            showMessage('success', 'Booking status updated successfully!');
            loadHealthPackageBookings();
        } catch (error) {
            console.error('Error updating booking status:', error);
            showMessage('error', 'Failed to update booking status');
        }
    };

    const deleteHealthPackageBooking = async (id) => {
        if (!confirm('Are you sure you want to delete this booking?')) return;

        try {
            const { error } = await supabase
                .from('health_package_bookings')
                .delete()
                .eq('id', id);

            if (error) throw error;

            showMessage('success', 'Booking deleted successfully!');
            loadHealthPackageBookings();
        } catch (error) {
            console.error('Error deleting booking:', error);
            showMessage('error', 'Failed to delete booking');
        }
    };

    // Appointment Management Functions
    const updateAppointmentStatus = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('appointments')
                .update({
                    status: newStatus,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id);

            if (error) throw error;

            showMessage('success', 'Appointment status updated successfully!');
            loadAppointments();
        } catch (error) {
            console.error('Error updating appointment status:', error);
            showMessage('error', 'Failed to update appointment status');
        }
    };

    const deleteAppointment = async (id) => {
        if (!confirm('Are you sure you want to delete this appointment?')) return;

        try {
            const { error } = await supabase
                .from('appointments')
                .delete()
                .eq('id', id);

            if (error) throw error;

            showMessage('success', 'Appointment deleted successfully!');
            loadAppointments();
        } catch (error) {
            console.error('Error deleting appointment:', error);
            showMessage('error', 'Failed to delete appointment');
        }
    };

    const rescheduleAppointment = (appointment) => {
        setEditingAppointment(appointment);
        setShowEditModal(true);
    };

    const saveRescheduledAppointment = async (updatedData) => {
        try {
            const { error } = await supabase
                .from('appointments')
                .update({
                    date: updatedData.date,
                    time: updatedData.time,
                    updated_at: new Date().toISOString()
                })
                .eq('id', editingAppointment.id);

            if (error) throw error;

            showMessage('success', 'Appointment rescheduled successfully!');
            setShowEditModal(false);
            setEditingAppointment(null);
            loadAppointments();

            // Send reschedule email
            sendRescheduleEmail(editingAppointment, updatedData);
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
            showMessage('error', 'Failed to reschedule appointment');
        }
    };

    const sendConfirmationEmail = async (appointment) => {
        try {
            // Update status to confirmed first
            await updateAppointmentStatus(appointment.id, 'confirmed');

            showMessage('success', `Confirmation email sent to ${appointment.patient_email || appointment.patientEmail}`);

            // TODO: Implement actual email sending via your email service
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            showMessage('error', 'Failed to send confirmation email');
        }
    };

    const sendRescheduleEmail = async (oldAppointment, newData) => {
        try {
            showMessage('success', `Reschedule notification sent to ${oldAppointment.patient_email || oldAppointment.patientEmail}`);

            // TODO: Implement actual email sending
        } catch (error) {
            console.error('Error sending reschedule email:', error);
        }
    };

    const sendCancellationEmail = async (appointment) => {
        try {
            await updateAppointmentStatus(appointment.id, 'cancelled');

            showMessage('success', `Cancellation email sent to ${appointment.patient_email || appointment.patientEmail}`);

            // TODO: Implement actual email sending
        } catch (error) {
            console.error('Error sending cancellation email:', error);
            showMessage('error', 'Failed to send cancellation email');
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Video Management Functions
    const loadVideos = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('videos')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setVideos(data || []);
        } catch (error) {
            console.error('Error loading videos:', error);
            showMessage('error', 'Failed to load videos');
        } finally {
            setLoading(false);
        }
    };

    const loadVideoSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('video_settings')
                .select('*')
                .single();

            if (error) throw error;
            if (data) setVideoSettings(data);
        } catch (error) {
            console.error('Error loading video settings:', error);
        }
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('videos')
                .insert([videoForm])
                .select();

            if (error) throw error;

            showMessage('success', 'Video added successfully!');
            setVideoForm({
                title: '',
                description: '',
                video_url: '',
                category: 'General',
                display_order: 0,
                published: true
            });
            loadVideos();
        } catch (error) {
            console.error('Error adding video:', error);
            showMessage('error', 'Failed to add video');
        } finally {
            setLoading(false);
        }
    };

    const deleteVideo = async (id) => {
        if (!confirm('Are you sure you want to delete this video?')) return;

        try {
            const { error } = await supabase
                .from('videos')
                .delete()
                .eq('id', id);

            if (error) throw error;

            showMessage('success', 'Video deleted successfully!');
            loadVideos();
        } catch (error) {
            console.error('Error deleting video:', error);
            showMessage('error', 'Failed to delete video');
        }
    };

    const toggleVideoPublish = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('videos')
                .update({ published: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            showMessage('success', 'Video status updated!');
            loadVideos();
        } catch (error) {
            console.error('Error updating video:', error);
            showMessage('error', 'Failed to update video');
        }
    };

    const updateVideoSettings = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { error } = await supabase
                .from('video_settings')
                .update({
                    section_title: videoSettings.section_title,
                    section_subtitle: videoSettings.section_subtitle,
                    section_description: videoSettings.section_description,
                    updated_at: new Date().toISOString()
                })
                .eq('id', 1);

            if (error) throw error;

            showMessage('success', 'Video section settings updated!');
        } catch (error) {
            console.error('Error updating settings:', error);
            showMessage('error', 'Failed to update settings');
        } finally {
            setLoading(false);
        }
    };

    // Show loading while checking authentication
    if (!isAuthenticated) {
        return (
            <div className="admin-container">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Verifying authentication...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <div className="admin-header-content">
                    <div className="admin-header-left">
                        <img src="/aarunya-logo.svg" alt="Aarunya Health Care" className="admin-logo" />
                        <div className="admin-header-text">
                            <h1>Admin Dashboard</h1>
                            <p>Manage bookings, blog posts, and media</p>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        🚪 Logout
                    </button>
                </div>
            </div>

            {message.text && (
                <div className={`admin-message ${message.type}`}>
                    {message.type === 'success' ? '✅' : '❌'} {message.text}
                </div>
            )}

            <div className="admin-tabs">
                <button
                    className={`admin-tab ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    📅 Bookings
                </button>
                <button
                    className={`admin-tab ${activeTab === 'package-bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('package-bookings')}
                >
                    📦 Package Bookings
                </button>
                <button
                    className={`admin-tab ${activeTab === 'doctors' ? 'active' : ''}`}
                    onClick={() => setActiveTab('doctors')}
                >
                    👨‍⚕️ Doctors
                </button>
                <button
                    className={`admin-tab ${activeTab === 'blogs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('blogs')}
                >
                    📝 Blog Posts
                </button>
                <button
                    className={`admin-tab ${activeTab === 'create-blog' ? 'active' : ''}`}
                    onClick={() => setActiveTab('create-blog')}
                >
                    ➕ Create Blog
                </button>
                <button
                    className={`admin-tab ${activeTab === 'add-doctor' ? 'active' : ''}`}
                    onClick={() => setActiveTab('add-doctor')}
                >
                    ➕ Add Doctor
                </button>
                <button
                    className={`admin-tab ${activeTab === 'videos' ? 'active' : ''}`}
                    onClick={() => setActiveTab('videos')}
                >
                    🎬 Videos
                </button>
                <button
                    className={`admin-tab ${activeTab === 'add-video' ? 'active' : ''}`}
                    onClick={() => setActiveTab('add-video')}
                >
                    ➕ Add Video
                </button>
                <button
                    className={`admin-tab ${activeTab === 'video-settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('video-settings')}
                >
                    ⚙️ Video Settings
                </button>
            </div>

            <div className="admin-content">
                {activeTab === 'bookings' && (
                    <div className="bookings-section">
                        <h2>Appointment Bookings ({appointments.length})</h2>
                        {loading ? (
                            <div className="loading-state">
                                <div className="loading-spinner"></div>
                                <p>Loading appointments...</p>
                            </div>
                        ) : appointments.length === 0 ? (
                            <p className="empty-state">No bookings yet</p>
                        ) : (
                            <div className="bookings-table-wrapper">
                                <table className="bookings-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Patient</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Doctor</th>
                                            <th>Department</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                            <th>Reason</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((apt, index) => (
                                            <tr key={apt.id || index}>
                                                <td>#{index + 1}</td>
                                                <td>{apt.patient_name || apt.patientName}</td>
                                                <td>{apt.patient_email || apt.patientEmail}</td>
                                                <td>{apt.patient_phone || apt.patientPhone}</td>
                                                <td>{apt.doctor}</td>
                                                <td>{apt.department}</td>
                                                <td>{apt.date}</td>
                                                <td>{apt.time}</td>
                                                <td>
                                                    <select
                                                        className={`status-select ${apt.status || 'pending'}`}
                                                        value={apt.status || 'pending'}
                                                        onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="confirmed">Confirmed</option>
                                                        <option value="completed">Completed</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                                <td>{apt.reason || 'N/A'}</td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button
                                                            className="btn-edit-small"
                                                            onClick={() => rescheduleAppointment(apt)}
                                                            disabled={apt.status === 'cancelled' || apt.status === 'completed'}
                                                            title="Reschedule Appointment"
                                                        >
                                                            📅 Reschedule
                                                        </button>
                                                        <button
                                                            className="btn-view-small"
                                                            onClick={() => sendConfirmationEmail(apt)}
                                                            disabled={apt.status === 'confirmed' || apt.status === 'cancelled'}
                                                            title="Send Confirmation Email"
                                                        >
                                                            ✉️ Confirm
                                                        </button>
                                                        <button
                                                            className="btn-cancel-small"
                                                            onClick={() => sendCancellationEmail(apt)}
                                                            disabled={apt.status === 'cancelled'}
                                                            title="Cancel & Send Email"
                                                        >
                                                            ❌ Cancel
                                                        </button>
                                                        <button
                                                            className="btn-delete-small"
                                                            onClick={() => deleteAppointment(apt.id)}
                                                            title="Delete Appointment"
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Health Package Bookings Section */}
                {activeTab === 'package-bookings' && (
                    <div className="package-bookings-section">
                        <h2>Health Package Bookings ({healthPackageBookings.length})</h2>
                        {loading ? (
                            <div className="loading-state">
                                <div className="loading-spinner"></div>
                                <p>Loading package bookings...</p>
                            </div>
                        ) : healthPackageBookings.length === 0 ? (
                            <p className="empty-state">No package bookings yet</p>
                        ) : (
                            <div className="bookings-table-wrapper">
                                <table className="bookings-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Package</th>
                                            <th>Type</th>
                                            <th>Customer</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Age</th>
                                            <th>Preferred Date</th>
                                            <th>Status</th>
                                            <th>Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {healthPackageBookings.map((booking, index) => (
                                            <tr key={booking.id || index}>
                                                <td>#{index + 1}</td>
                                                <td>
                                                    <strong>{booking.package_name}</strong>
                                                    <br />
                                                    <small style={{ color: '#7c4dff' }}>{booking.package_price}</small>
                                                </td>
                                                <td>
                                                    <span className={`type-badge ${booking.package_type}`}>
                                                        {booking.package_type === 'health_check' ? 'Health Check' : 'Wellness'}
                                                    </span>
                                                </td>
                                                <td>{booking.customer_name}</td>
                                                <td>{booking.customer_email}</td>
                                                <td>{booking.customer_phone}</td>
                                                <td>{booking.customer_age || 'N/A'}</td>
                                                <td>
                                                    {booking.preferred_date ? (
                                                        <>
                                                            {new Date(booking.preferred_date).toLocaleDateString()}
                                                            {booking.preferred_time && (
                                                                <>
                                                                    <br />
                                                                    <small>{booking.preferred_time}</small>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        'Not specified'
                                                    )}
                                                </td>
                                                <td>
                                                    <select
                                                        className={`status-select ${booking.status}`}
                                                        value={booking.status}
                                                        onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="confirmed">Confirmed</option>
                                                        <option value="completed">Completed</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                                <td>{formatDate(booking.created_at)}</td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button
                                                            className="btn-view-small"
                                                            onClick={() => {
                                                                alert(`
Package: ${booking.package_name}
Customer: ${booking.customer_name}
Email: ${booking.customer_email}
Phone: ${booking.customer_phone}
Age: ${booking.customer_age || 'N/A'}
Address: ${booking.customer_address || 'N/A'}

Medical History: ${booking.medical_history || 'None provided'}
Current Medications: ${booking.current_medications || 'None'}
Special Requirements: ${booking.special_requirements || 'None'}
                                                                `);
                                                            }}
                                                            title="View Details"
                                                        >
                                                            👁️ View
                                                        </button>
                                                        <button
                                                            className="btn-delete-small"
                                                            onClick={() => deleteHealthPackageBooking(booking.id)}
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'blogs' && (
                    <div className="blogs-section">
                        <h2>Blog Posts ({blogPosts.length})</h2>
                        {loading ? (
                            <div className="loading-state">
                                <div className="loading-spinner"></div>
                                <p>Loading...</p>
                            </div>
                        ) : blogPosts.length === 0 ? (
                            <p className="empty-state">No blog posts yet</p>
                        ) : (
                            <div className="blogs-grid">
                                {blogPosts.map(post => (
                                    <div key={post.id} className="blog-admin-card">
                                        {post.image_url && (
                                            <img src={post.image_url} alt={post.title} className="blog-admin-image" />
                                        )}
                                        <div className="blog-admin-content">
                                            <div className="blog-admin-header">
                                                <h3>{post.title}</h3>
                                                <span className={`publish-badge ${post.published ? 'published' : 'draft'}`}>
                                                    {post.published ? '✓ Published' : '○ Draft'}
                                                </span>
                                            </div>
                                            <p className="blog-admin-meta">
                                                {post.category} • {formatDate(post.created_at)}
                                            </p>
                                            {post.author && <p className="blog-admin-author">By {post.author}</p>}
                                            <div className="blog-admin-actions">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => openEditBlog(post)}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    className="btn-toggle"
                                                    onClick={() => togglePublish(post.id, post.published)}
                                                >
                                                    {post.published ? 'Unpublish' : 'Publish'}
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => deleteBlogPost(post.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'create-blog' && (
                    <div className="create-blog-section">
                        <h2>Create New Blog Post</h2>
                        <form onSubmit={handleBlogSubmit} className="blog-form">
                            <div className="form-group">
                                <label>Title *</label>
                                <input
                                    type="text"
                                    value={blogForm.title}
                                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                    required
                                    placeholder="Enter blog title"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category *</label>
                                    <select
                                        value={blogForm.category}
                                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                                        required
                                    >
                                        <option value="health">Health</option>
                                        <option value="wellness">Wellness</option>
                                        <option value="cardiology">Cardiology</option>
                                        <option value="neurology">Neurology</option>
                                        <option value="pediatrics">Pediatrics</option>
                                        <option value="nutrition">Nutrition</option>
                                        <option value="mental-health">Mental Health</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Author</label>
                                    <input
                                        type="text"
                                        value={blogForm.author}
                                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                                        placeholder="Author name"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Excerpt (Short Description)</label>
                                <textarea
                                    value={blogForm.excerpt}
                                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                                    placeholder="Brief summary of the post..."
                                    rows="3"
                                />
                            </div>

                            <div className="form-group">
                                <label>Content * (HTML supported)</label>
                                <textarea
                                    value={blogForm.content}
                                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                                    required
                                    placeholder="Write your blog content here... You can use HTML tags like <h2>, <p>, <ul>, <li>, etc."
                                    rows="10"
                                />
                            </div>

                            <div className="form-group">
                                <label>Featured Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploadingImage}
                                />
                                {uploadingImage && <p className="upload-status">Uploading...</p>}
                                {blogForm.image_url && (
                                    <div className="image-preview">
                                        <img src={blogForm.image_url} alt="Preview" />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Video URL (YouTube or Vimeo - any format works)</label>
                                <input
                                    type="url"
                                    value={blogForm.video_url}
                                    onChange={(e) => setBlogForm({ ...blogForm, video_url: e.target.value })}
                                    placeholder="Paste any YouTube or Vimeo URL (e.g., https://www.youtube.com/watch?v=...)"
                                />
                                <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
                                    💡 Tip: Paste any YouTube or Vimeo link - it will be automatically converted to the correct format
                                </small>
                            </div>

                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={blogForm.published}
                                        onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                                    />
                                    Publish immediately
                                </label>
                            </div>

                            <button type="submit" className="btn-submit" disabled={loading}>
                                {loading ? 'Creating...' : '✓ Create Blog Post'}
                            </button>
                        </form>
                    </div>
                )}
                {/* Doctors List Section */}
                {activeTab === 'doctors' && (
                    <div className="doctors-section">
                        <h2>Doctors ({doctors.length})</h2>
                        {loading ? (
                            <div className="loading-state">
                                <div className="loading-spinner"></div>
                                <p>Loading doctors...</p>
                            </div>
                        ) : doctors.length === 0 ? (
                            <p className="empty-state">No doctors added yet</p>
                        ) : (
                            <div className="doctors-grid">
                                {doctors.map(doctor => (
                                    <div key={doctor.id} className="doctor-card">
                                        {doctor.image_url && (
                                            <img src={doctor.image_url} alt={doctor.name} className="doctor-image" />
                                        )}
                                        <div className="doctor-info">
                                            <h3>{doctor.name}</h3>
                                            <p className="doctor-specialization">{doctor.specialization}</p>
                                            <p className="doctor-department">🏥 {doctor.department}</p>
                                            {doctor.qualification && <p className="doctor-qualification">🎓 {doctor.qualification}</p>}
                                            {doctor.experience && <p className="doctor-experience">⏱️ {doctor.experience}</p>}
                                            {doctor.about && <p className="doctor-about">{doctor.about}</p>}
                                            <div className="doctor-contact">
                                                <p>📧 {doctor.email}</p>
                                                {doctor.phone && <p>📱 {doctor.phone}</p>}
                                                {doctor.consultation_fee && <p>💰 ₹{doctor.consultation_fee}</p>}
                                            </div>
                                            <div className="doctor-status">
                                                <span className={`availability-badge ${doctor.available ? 'available' : 'unavailable'}`}>
                                                    {doctor.available ? '✓ Available' : '○ Unavailable'}
                                                </span>
                                            </div>
                                            <div className="doctor-actions">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => openEditDoctor(doctor)}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    className="btn-toggle"
                                                    onClick={() => toggleDoctorAvailability(doctor.id, doctor.available)}
                                                >
                                                    {doctor.available ? 'Mark Unavailable' : 'Mark Available'}
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => deleteDoctor(doctor.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Add Doctor Section */}
                {activeTab === 'add-doctor' && (
                    <div className="add-doctor-section">
                        <h2>Add New Doctor</h2>
                        <form onSubmit={handleDoctorSubmit} className="doctor-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        value={doctorForm.name}
                                        onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                                        required
                                        placeholder="Dr. John Doe"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        value={doctorForm.email}
                                        onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                                        required
                                        placeholder="doctor@hospital.com"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        value={doctorForm.phone}
                                        onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Consultation Fee (₹)</label>
                                    <input
                                        type="number"
                                        value={doctorForm.consultation_fee}
                                        onChange={(e) => setDoctorForm({ ...doctorForm, consultation_fee: e.target.value })}
                                        placeholder="500"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Specialization *</label>
                                    <input
                                        type="text"
                                        value={doctorForm.specialization}
                                        onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                                        required
                                        placeholder="Cardiologist, Neurologist, etc."
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Department *</label>
                                    <select
                                        value={doctorForm.department}
                                        onChange={(e) => setDoctorForm({ ...doctorForm, department: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Cardiology">Cardiology</option>
                                        <option value="Neurology">Neurology</option>
                                        <option value="Orthopedics">Orthopedics</option>
                                        <option value="Pediatrics">Pediatrics</option>
                                        <option value="General Medicine">General Medicine</option>
                                        <option value="Dermatology">Dermatology</option>
                                        <option value="ENT">ENT</option>
                                        <option value="Ophthalmology">Ophthalmology</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Qualification</label>
                                    <input
                                        type="text"
                                        value={doctorForm.qualification}
                                        onChange={(e) => setDoctorForm({ ...doctorForm, qualification: e.target.value })}
                                        placeholder="MBBS, MD, etc."
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Experience</label>
                                    <input
                                        type="text"
                                        value={doctorForm.experience}
                                        onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                                        placeholder="10+ years"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>About Doctor</label>
                                <textarea
                                    value={doctorForm.about}
                                    onChange={(e) => setDoctorForm({ ...doctorForm, about: e.target.value })}
                                    placeholder="Brief description about the doctor's expertise and achievements..."
                                    rows="4"
                                />
                            </div>

                            <div className="form-group">
                                <label>Profile Image</label>
                                <div className="image-upload-container">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleDoctorImageUpload(e, false)}
                                        id="doctor-image-upload"
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="doctor-image-upload" className="btn-upload">
                                        {uploadingImage ? 'Uploading...' : '📷 Upload Image'}
                                    </label>
                                    {doctorForm.image_url && (
                                        <div className="image-preview">
                                            <img src={doctorForm.image_url} alt="Preview" />
                                            <button
                                                type="button"
                                                className="btn-remove-image"
                                                onClick={() => setDoctorForm({ ...doctorForm, image_url: '' })}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <small style={{ color: '#64748b', marginTop: '0.5rem', display: 'block' }}>
                                    Or enter image URL manually:
                                </small>
                                <input
                                    type="url"
                                    value={doctorForm.image_url}
                                    onChange={(e) => setDoctorForm({ ...doctorForm, image_url: e.target.value })}
                                    placeholder="https://example.com/doctor-photo.jpg"
                                    style={{ marginTop: '0.5rem' }}
                                />
                            </div>

                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={doctorForm.available}
                                        onChange={(e) => setDoctorForm({ ...doctorForm, available: e.target.checked })}
                                    />
                                    Available for appointments
                                </label>
                            </div>

                            <button type="submit" className="btn-submit" disabled={loading}>
                                {loading ? 'Adding Doctor...' : '✓ Add Doctor'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Edit Appointment Modal */}
                {showEditModal && editingAppointment && (
                    <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>✏️ Edit Appointment</h2>
                            <form onSubmit={updateAppointment}>
                                <div className="form-group">
                                    <label>Patient Name</label>
                                    <input type="text" value={editingAppointment.patient_name || editingAppointment.patientName} disabled />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Date *</label>
                                        <input type="date" value={editingAppointment.date} onChange={(e) => setEditingAppointment({ ...editingAppointment, date: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Time *</label>
                                        <input type="time" value={editingAppointment.time} onChange={(e) => setEditingAppointment({ ...editingAppointment, time: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select value={editingAppointment.status} onChange={(e) => setEditingAppointment({ ...editingAppointment, status: e.target.value })}>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="rescheduled">Rescheduled</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Reason</label>
                                    <textarea value={editingAppointment.reason || ''} onChange={(e) => setEditingAppointment({ ...editingAppointment, reason: e.target.value })} rows="3" />
                                </div>
                                <div className="modal-actions">
                                    <button type="submit" className="btn-submit" disabled={loading}>{loading ? 'Updating...' : '✓ Update & Notify Patient'}</button>
                                    <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Blog Modal */}
                {showBlogEditModal && editingBlog && (
                    <div className="modal-overlay" onClick={() => setShowBlogEditModal(false)}>
                        <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
                            <h2>✏️ Edit Blog Post</h2>
                            <form onSubmit={updateBlogPost}>
                                <div className="form-group">
                                    <label>Title *</label>
                                    <input type="text" value={editingBlog.title} onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Category *</label>
                                        <select value={editingBlog.category} onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })} required>
                                            <option value="health">Health</option>
                                            <option value="wellness">Wellness</option>
                                            <option value="cardiology">Cardiology</option>
                                            <option value="neurology">Neurology</option>
                                            <option value="pediatrics">Pediatrics</option>
                                            <option value="nutrition">Nutrition</option>
                                            <option value="mental-health">Mental Health</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Author</label>
                                        <input type="text" value={editingBlog.author || ''} onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Excerpt</label>
                                    <textarea value={editingBlog.excerpt || ''} onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })} rows="3" />
                                </div>
                                <div className="form-group">
                                    <label>Content * (HTML supported)</label>
                                    <textarea value={editingBlog.content} onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })} required rows="10" />
                                </div>
                                <div className="form-group">
                                    <label>Video URL</label>
                                    <input type="url" value={editingBlog.video_url || ''} onChange={(e) => setEditingBlog({ ...editingBlog, video_url: e.target.value })} placeholder="https://www.youtube.com/embed/..." />
                                </div>
                                <div className="form-group checkbox-group">
                                    <label>
                                        <input type="checkbox" checked={editingBlog.published} onChange={(e) => setEditingBlog({ ...editingBlog, published: e.target.checked })} />
                                        Published
                                    </label>
                                </div>
                                <div className="modal-actions">
                                    <button type="submit" className="btn-submit" disabled={loading}>{loading ? 'Updating...' : '✓ Update Blog Post'}</button>
                                    <button type="button" className="btn-cancel" onClick={() => setShowBlogEditModal(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Edit Doctor Modal */}
                {showDoctorEditModal && editingDoctor && (
                    <div className="modal-overlay" onClick={() => setShowDoctorEditModal(false)}>
                        <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
                            <h2>✏️ Edit Doctor</h2>
                            <form onSubmit={updateDoctor}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input type="text" value={editingDoctor.name} onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input type="email" value={editingDoctor.email} onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="tel" value={editingDoctor.phone || ''} onChange={(e) => setEditingDoctor({ ...editingDoctor, phone: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Consultation Fee (₹)</label>
                                        <input type="number" value={editingDoctor.consultation_fee || ''} onChange={(e) => setEditingDoctor({ ...editingDoctor, consultation_fee: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Specialization *</label>
                                        <input type="text" value={editingDoctor.specialization} onChange={(e) => setEditingDoctor({ ...editingDoctor, specialization: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Department *</label>
                                        <select value={editingDoctor.department} onChange={(e) => setEditingDoctor({ ...editingDoctor, department: e.target.value })} required>
                                            <option value="">Select Department</option>
                                            <option value="Cardiology">Cardiology</option>
                                            <option value="Neurology">Neurology</option>
                                            <option value="Orthopedics">Orthopedics</option>
                                            <option value="Pediatrics">Pediatrics</option>
                                            <option value="General Medicine">General Medicine</option>
                                            <option value="Dermatology">Dermatology</option>
                                            <option value="ENT">ENT</option>
                                            <option value="Ophthalmology">Ophthalmology</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Qualification</label>
                                        <input type="text" value={editingDoctor.qualification || ''} onChange={(e) => setEditingDoctor({ ...editingDoctor, qualification: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Experience</label>
                                        <input type="text" value={editingDoctor.experience || ''} onChange={(e) => setEditingDoctor({ ...editingDoctor, experience: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>About Doctor</label>
                                    <textarea value={editingDoctor.about || ''} onChange={(e) => setEditingDoctor({ ...editingDoctor, about: e.target.value })} rows="4" />
                                </div>
                                <div className="form-group">
                                    <label>Profile Image</label>
                                    <div className="image-upload-container">
                                        <input type="file" accept="image/*" onChange={(e) => handleDoctorImageUpload(e, true)} id="doctor-image-upload-edit" style={{ display: 'none' }} />
                                        <label htmlFor="doctor-image-upload-edit" className="btn-upload">
                                            {uploadingImage ? 'Uploading...' : '📷 Upload New Image'}
                                        </label>
                                        {editingDoctor.image_url && (
                                            <div className="image-preview">
                                                <img src={editingDoctor.image_url} alt="Preview" />
                                                <button type="button" className="btn-remove-image" onClick={() => setEditingDoctor({ ...editingDoctor, image_url: '' })}>✕</button>
                                            </div>
                                        )}
                                    </div>
                                    <small style={{ color: '#64748b', marginTop: '0.5rem', display: 'block' }}>Or enter image URL manually:</small>
                                    <input type="url" value={editingDoctor.image_url || ''} onChange={(e) => setEditingDoctor({ ...editingDoctor, image_url: e.target.value })} placeholder="https://example.com/doctor-photo.jpg" style={{ marginTop: '0.5rem' }} />
                                </div>
                                <div className="form-group checkbox-group">
                                    <label>
                                        <input type="checkbox" checked={editingDoctor.available} onChange={(e) => setEditingDoctor({ ...editingDoctor, available: e.target.checked })} />
                                        Available for appointments
                                    </label>
                                </div>
                                <div className="modal-actions">
                                    <button type="submit" className="btn-submit" disabled={loading}>{loading ? 'Updating...' : '✓ Update Doctor'}</button>
                                    <button type="button" className="btn-cancel" onClick={() => setShowDoctorEditModal(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Videos List Section */}
                {activeTab === 'videos' && (
                    <div className="videos-section">
                        <h2>Video Gallery ({videos.length})</h2>
                        {loading ? (
                            <div className="loading-state">
                                <div className="loading-spinner"></div>
                                <p>Loading videos...</p>
                            </div>
                        ) : videos.length === 0 ? (
                            <p className="empty-state">No videos yet</p>
                        ) : (
                            <div className="videos-grid">
                                {videos.map(video => (
                                    <div key={video.id} className="video-admin-card">
                                        <div className="video-admin-thumbnail">
                                            <img
                                                src={(() => {
                                                    // Extract video ID from URL
                                                    const url = video.video_url;
                                                    if (!url) return 'https://via.placeholder.com/320x180?text=Video';

                                                    // If already just an ID
                                                    if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
                                                        return `https://img.youtube.com/vi/${url}/hqdefault.jpg`;
                                                    }

                                                    // Extract from YouTube URL
                                                    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                                                    if (match && match[1]) {
                                                        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
                                                    }

                                                    return 'https://via.placeholder.com/320x180?text=Video';
                                                })()}
                                                alt={video.title}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/320x180?text=Video';
                                                }}
                                            />
                                            <span className={`publish-badge ${video.published ? 'published' : 'draft'}`}>
                                                {video.published ? '✓ Published' : '○ Draft'}
                                            </span>
                                        </div>
                                        <div className="video-admin-content">
                                            <div className="video-admin-header">
                                                <h3>{video.title}</h3>
                                                <span className="video-category-badge">{video.category}</span>
                                            </div>
                                            <p className="video-admin-desc">{video.description}</p>
                                            <div className="video-admin-meta">
                                                Order: {video.display_order} • Created: {formatDate(video.created_at)}
                                            </div>
                                            <div className="video-admin-actions">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => {
                                                        setEditingVideo(video);
                                                        setShowVideoEditModal(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn-toggle"
                                                    onClick={() => toggleVideoPublish(video.id, video.published)}
                                                >
                                                    {video.published ? 'Unpublish' : 'Publish'}
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => deleteVideo(video.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Add Video Section */}
                {activeTab === 'add-video' && (
                    <div className="add-video-section">
                        <h2>Add New Video</h2>
                        <form onSubmit={handleVideoSubmit} className="video-form">
                            <div className="form-group">
                                <label>Video Title *</label>
                                <input
                                    type="text"
                                    value={videoForm.title}
                                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                                    required
                                    placeholder="Enter video title"
                                />
                            </div>

                            <div className="form-group">
                                <label>YouTube Video URL or ID *</label>
                                <input
                                    type="text"
                                    value={videoForm.video_url}
                                    onChange={(e) => setVideoForm({ ...videoForm, video_url: e.target.value })}
                                    required
                                    placeholder="https://www.youtube.com/watch?v=... or just the video ID"
                                />
                                <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
                                    💡 Paste any YouTube URL or just the 11-character video ID
                                </small>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={videoForm.description}
                                    onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                                    placeholder="Brief description of the video"
                                    rows="3"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        value={videoForm.category}
                                        onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                                        placeholder="e.g., Introduction, Services, Testimonials"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Display Order</label>
                                    <input
                                        type="number"
                                        value={videoForm.display_order}
                                        onChange={(e) => setVideoForm({ ...videoForm, display_order: parseInt(e.target.value) })}
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={videoForm.published}
                                        onChange={(e) => setVideoForm({ ...videoForm, published: e.target.checked })}
                                    />
                                    Publish immediately
                                </label>
                            </div>

                            <button type="submit" className="btn-submit" disabled={loading}>
                                {loading ? 'Adding...' : '✓ Add Video'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Video Settings Section */}
                {activeTab === 'video-settings' && (
                    <div className="video-settings-section">
                        <h2>Video Gallery Section Settings</h2>

                        {/* Section Visibility Toggle */}
                        <div className="section-visibility-toggle">
                            <label>Show Video Gallery Section on Website</label>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={videoSettings.section_visible !== false}
                                    onChange={(e) => {
                                        setVideoSettings({ ...videoSettings, section_visible: e.target.checked });
                                        // Auto-save visibility
                                        supabase
                                            .from('video_settings')
                                            .update({ section_visible: e.target.checked })
                                            .eq('id', 1)
                                            .then(() => showMessage('success', `Video section ${e.target.checked ? 'enabled' : 'disabled'}!`));
                                    }}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <form onSubmit={updateVideoSettings} className="settings-form">
                            <div className="form-group">
                                <label>Section Title</label>
                                <input
                                    type="text"
                                    value={videoSettings.section_title}
                                    onChange={(e) => setVideoSettings({ ...videoSettings, section_title: e.target.value })}
                                    placeholder="e.g., Watch Our Stories"
                                />
                            </div>

                            <div className="form-group">
                                <label>Section Subtitle (Badge)</label>
                                <input
                                    type="text"
                                    value={videoSettings.section_subtitle}
                                    onChange={(e) => setVideoSettings({ ...videoSettings, section_subtitle: e.target.value })}
                                    placeholder="e.g., Video Gallery"
                                />
                            </div>

                            <div className="form-group">
                                <label>Section Description</label>
                                <textarea
                                    value={videoSettings.section_description}
                                    onChange={(e) => setVideoSettings({ ...videoSettings, section_description: e.target.value })}
                                    placeholder="Brief description of the video gallery section"
                                    rows="3"
                                />
                            </div>

                            <button type="submit" className="btn-submit" disabled={loading}>
                                {loading ? 'Updating...' : '✓ Update Settings'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Edit Video Modal */}
                {showVideoEditModal && editingVideo && (
                    <VideoEditModal
                        video={editingVideo}
                        onClose={() => setShowVideoEditModal(false)}
                        onUpdate={() => {
                            showMessage('success', 'Video updated successfully!');
                            loadVideos();
                        }}
                        supabase={supabase}
                    />
                )}

                {/* Reschedule Appointment Modal */}
                {showEditModal && editingAppointment && (
                    <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Reschedule Appointment</h3>
                                <button className="modal-close" onClick={() => setShowEditModal(false)}>✕</button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Patient:</strong> {editingAppointment.patient_name || editingAppointment.patientName}</p>
                                <p><strong>Doctor:</strong> {editingAppointment.doctor}</p>
                                <p><strong>Current Date:</strong> {editingAppointment.date}</p>
                                <p><strong>Current Time:</strong> {editingAppointment.time}</p>

                                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                                    <label>New Date:</label>
                                    <input
                                        type="date"
                                        id="reschedule-date"
                                        defaultValue={editingAppointment.date}
                                        min={new Date().toISOString().split('T')[0]}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #e2e8f0' }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>New Time:</label>
                                    <select
                                        id="reschedule-time"
                                        defaultValue={editingAppointment.time}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #e2e8f0' }}
                                    >
                                        <option value="09:00 AM">09:00 AM</option>
                                        <option value="09:30 AM">09:30 AM</option>
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="10:30 AM">10:30 AM</option>
                                        <option value="11:00 AM">11:00 AM</option>
                                        <option value="11:30 AM">11:30 AM</option>
                                        <option value="12:00 PM">12:00 PM</option>
                                        <option value="12:30 PM">12:30 PM</option>
                                        <option value="01:00 PM">01:00 PM</option>
                                        <option value="01:30 PM">01:30 PM</option>
                                        <option value="02:00 PM">02:00 PM</option>
                                        <option value="02:30 PM">02:30 PM</option>
                                        <option value="03:00 PM">03:00 PM</option>
                                        <option value="03:30 PM">03:30 PM</option>
                                        <option value="04:00 PM">04:00 PM</option>
                                        <option value="04:30 PM">04:30 PM</option>
                                        <option value="05:00 PM">05:00 PM</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn-secondary"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        const newDate = document.getElementById('reschedule-date').value;
                                        const newTime = document.getElementById('reschedule-time').value;
                                        saveRescheduledAppointment({ date: newDate, time: newTime });
                                    }}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
