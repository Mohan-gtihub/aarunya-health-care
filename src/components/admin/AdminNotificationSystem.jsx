import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';

/**
 * Real-time Admin Notification System
 * Monitors new appointments and bookings with sound alerts and browser notifications
 */
export default function AdminNotificationSystem({ onNewNotification }) {
    const [notifications, setNotifications] = useState([]);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [browserNotificationsEnabled, setBrowserNotificationsEnabled] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const audioRef = useRef(null);
    const lastCheckRef = useRef(new Date().toISOString());

    // Request browser notification permission
    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                setBrowserNotificationsEnabled(permission === 'granted');
            });
        } else if ('Notification' in window && Notification.permission === 'granted') {
            setBrowserNotificationsEnabled(true);
        }
    }, []);

    // Subscribe to real-time changes
    useEffect(() => {
        // Subscribe to new appointments
        const appointmentSubscription = supabase
            .channel('admin-appointments')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'appointments'
                },
                (payload) => {
                    handleNewAppointment(payload.new);
                }
            )
            .subscribe();

        // Subscribe to new health package bookings
        const packageSubscription = supabase
            .channel('admin-packages')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'health_package_bookings'
                },
                (payload) => {
                    handleNewPackageBooking(payload.new);
                }
            )
            .subscribe();

        // Poll for new items every 30 seconds as backup
        const pollInterval = setInterval(() => {
            checkForNewItems();
        }, 30000);

        return () => {
            appointmentSubscription.unsubscribe();
            packageSubscription.unsubscribe();
            clearInterval(pollInterval);
        };
    }, []);

    const checkForNewItems = async () => {
        try {
            // Check for new appointments
            const { data: newAppointments } = await supabase
                .from('appointments')
                .select('*')
                .gte('created_at', lastCheckRef.current)
                .order('created_at', { ascending: false });

            if (newAppointments && newAppointments.length > 0) {
                newAppointments.forEach(apt => handleNewAppointment(apt));
            }

            // Check for new package bookings
            const { data: newBookings } = await supabase
                .from('health_package_bookings')
                .select('*')
                .gte('created_at', lastCheckRef.current)
                .order('created_at', { ascending: false });

            if (newBookings && newBookings.length > 0) {
                newBookings.forEach(booking => handleNewPackageBooking(booking));
            }

            lastCheckRef.current = new Date().toISOString();
        } catch (error) {
            console.error('Error checking for new items:', error);
        }
    };

    const handleNewAppointment = (appointment) => {
        const notification = {
            id: `apt-${appointment.id}-${Date.now()}`,
            type: 'appointment',
            title: '🏥 New Appointment Booking',
            message: `${appointment.patient_name} booked with ${appointment.doctor}`,
            details: `Date: ${appointment.date} at ${appointment.time}`,
            timestamp: new Date(),
            read: false,
            data: appointment
        };

        addNotification(notification);
    };

    const handleNewPackageBooking = (booking) => {
        const notification = {
            id: `pkg-${booking.id}-${Date.now()}`,
            type: 'package',
            title: '📦 New Package Booking',
            message: `${booking.customer_name} booked ${booking.package_name}`,
            details: booking.preferred_date ? `Preferred: ${booking.preferred_date}` : 'No date specified',
            timestamp: new Date(),
            read: false,
            data: booking
        };

        addNotification(notification);
    };

    const addNotification = (notification) => {
        setNotifications(prev => [notification, ...prev].slice(0, 50)); // Keep last 50
        setUnreadCount(prev => prev + 1);

        // Play sound
        if (soundEnabled && audioRef.current) {
            audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        }

        // Show browser notification
        if (browserNotificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
            new Notification(notification.title, {
                body: `${notification.message}\n${notification.details}`,
                icon: '/logo.png',
                badge: '/logo.png',
                tag: notification.id,
                requireInteraction: false
            });
        }

        // Callback to parent
        if (onNewNotification) {
            onNewNotification(notification);
        }
    };

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
    };

    const clearNotifications = () => {
        setNotifications([]);
        setUnreadCount(0);
    };

    return {
        notifications,
        unreadCount,
        soundEnabled,
        setSoundEnabled,
        browserNotificationsEnabled,
        setBrowserNotificationsEnabled,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        audioRef
    };
}
