import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaStar, FaEye, FaEyeSlash } from 'react-icons/fa';

const HealthPackageManager = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [sectionVisible, setSectionVisible] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        subtitle: '',
        price: '',
        color: '#7c4dff',
        popular: false,
        status: 'active',
        features: ''
    });

    useEffect(() => {
        fetchPackages();
        fetchSectionVisibility();
    }, []);

    const fetchSectionVisibility = async () => {
        try {
            const { data, error } = await supabase
                .from('admin_settings')
                .select('setting_value')
                .eq('setting_key', 'health_offers_visible')
                .single();

            if (data) {
                setSectionVisible(data.setting_value === 'true' || data.setting_value === true);
            }
        } catch (error) {
            console.error('Error fetching visibility:', error);
        }
    };

    const toggleSectionVisibility = async (newValue) => {
        setSectionVisible(newValue);
        try {
            const { error } = await supabase
                .from('admin_settings')
                .upsert({
                    setting_key: 'health_offers_visible',
                    setting_value: newValue,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'setting_key' });

            if (error) throw error;
        } catch (error) {
            console.error('Error saving visibility:', error);
            setSectionVisible(!newValue); // Revert on error
        }
    };

    const fetchPackages = async () => {
        try {
            const { data, error } = await supabase
                .from('health_packages')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;
            setPackages(data || []);
        } catch (error) {
            console.error('Error fetching packages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const featuresArray = formData.features.split('\n').filter(f => f.trim() !== '');

        const packageData = {
            title: formData.title,
            subtitle: formData.subtitle,
            price: formData.price,
            color: formData.color,
            popular: formData.popular,
            status: formData.status,
            features: featuresArray
        };

        try {
            if (isEditing) {
                const { error } = await supabase
                    .from('health_packages')
                    .update(packageData)
                    .eq('id', formData.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('health_packages')
                    .insert([packageData]);
                if (error) throw error;
            }

            fetchPackages();
            resetForm();
        } catch (error) {
            console.error('Error saving package:', error);
            alert('Error saving package');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (pkg) => {
        setFormData({
            id: pkg.id,
            title: pkg.title,
            subtitle: pkg.subtitle || '',
            price: pkg.price || '',
            color: pkg.color || '#7c4dff',
            popular: pkg.popular || false,
            status: pkg.status || 'active',
            features: pkg.features ? pkg.features.join('\n') : ''
        });
        setIsEditing(true);
        // Scroll to form
        document.querySelector('.admin-form').scrollIntoView({ behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this package?')) return;

        try {
            const { error } = await supabase
                .from('health_packages')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchPackages();
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            id: null,
            title: '',
            subtitle: '',
            price: '',
            color: '#7c4dff',
            popular: false,
            status: 'active',
            features: ''
        });
        setIsEditing(false);
    };

    return (
        <div className="health-package-manager">
            {/* Visibility Toggle Section */}
            <div className="visibility-card">
                <div className="visibility-info">
                    <h3><FaEye /> Website Visibility</h3>
                    <p>Control whether the "Health Check Offers" section is visible on the public website.</p>
                </div>
                <label className="toggle-switch large">
                    <input
                        type="checkbox"
                        checked={sectionVisible}
                        onChange={(e) => toggleSectionVisibility(e.target.checked)}
                    />
                    <span className="slider round"></span>
                </label>
            </div>

            <div className="section-header">
                <h2>Manage Health Packages</h2>
            </div>

            <div className="admin-grid-layout">
                {/* Form Section */}
                <div className="form-column">
                    <div className="admin-card form-card">
                        <div className="card-header">
                            <h3>{isEditing ? '✏️ Edit Package' : '➕ Add New Package'}</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Package Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Ex: Vital Wellness Package"
                                    className="modern-input"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Subtitle / Category</label>
                                    <input
                                        type="text"
                                        name="subtitle"
                                        value={formData.subtitle}
                                        onChange={handleInputChange}
                                        placeholder="Ex: Adults 25+"
                                        className="modern-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="Ex: 2,999"
                                        className="modern-input"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="modern-select"
                                    >
                                        <option value="active">✅ Active</option>
                                        <option value="coming_soon">⏳ Coming Soon</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Accent Color</label>
                                    <div className="color-picker-wrapper">
                                        <input
                                            type="color"
                                            name="color"
                                            value={formData.color}
                                            onChange={handleInputChange}
                                            className="color-input"
                                        />
                                        <input
                                            type="text"
                                            name="color"
                                            value={formData.color}
                                            onChange={handleInputChange}
                                            className="color-text-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Features (One per line)</label>
                                <textarea
                                    name="features"
                                    value={formData.features}
                                    onChange={handleInputChange}
                                    rows="6"
                                    placeholder="CBC&#10;BP Monitoring&#10;ECG"
                                    required
                                    className="modern-textarea"
                                />
                            </div>

                            <div className="form-group checkbox-wrapper">
                                <label className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        name="popular"
                                        checked={formData.popular}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkmark"></span>
                                    <span>Mark as "Most Popular"</span>
                                </label>
                            </div>

                            <div className="form-actions">
                                {isEditing && (
                                    <button type="button" onClick={resetForm} className="btn-cancel">
                                        Cancel
                                    </button>
                                )}
                                <button type="submit" className="btn-submit">
                                    {isEditing ? 'Update Package' : 'Create Package'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="list-column">
                    <h3>Existing Packages ({packages.length})</h3>
                    {loading ? <div className="loader"></div> : (
                        <div className="packages-stack">
                            {packages.length === 0 ? (
                                <p className="empty-msg">No packages created yet.</p>
                            ) : (
                                packages.map(pkg => (
                                    <div
                                        key={pkg.id}
                                        className={`package-item ${pkg.status === 'coming_soon' ? 'coming-soon' : ''}`}
                                        style={{ borderLeftColor: pkg.color }}
                                    >
                                        <div className="pkg-content">
                                            <div className="pkg-header">
                                                <span className="pkg-title" style={{ color: pkg.color }}>{pkg.title}</span>
                                                {pkg.popular && <span className="badge-popular"><FaStar /> Popular</span>}
                                                {pkg.status === 'coming_soon' && <span className="badge-soon">Coming Soon</span>}
                                            </div>
                                            <p className="pkg-subtitle">{pkg.subtitle}</p>
                                            <p className="pkg-price">
                                                {pkg.status === 'coming_soon' ? 'Price hidden' : `₹ ${pkg.price}`}
                                            </p>
                                            <div className="pkg-features-preview">
                                                {pkg.features?.slice(0, 3).join(', ')}
                                                {pkg.features?.length > 3 && ` +${pkg.features.length - 3} more`}
                                            </div>
                                        </div>
                                        <div className="pkg-actions">
                                            <button onClick={() => handleEdit(pkg)} className="action-btn edit" title="Edit">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDelete(pkg.id)} className="action-btn delete" title="Delete">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .health-package-manager {
                    padding: 1rem;
                }
                
                /* Visibility Toggle Card */
                .visibility-card {
                    background: linear-gradient(135deg, #1e293b, #0f172a);
                    color: white;
                    padding: 1.5rem 2rem;
                    border-radius: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .visibility-info h3 { margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem; font-size: 1.25rem; }
                .visibility-info p { margin: 0; opacity: 0.8; }
                
                /* Toggle Switch */
                .toggle-switch {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 34px;
                }
                .toggle-switch input { opacity: 0; width: 0; height: 0; }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-color: #ccc;
                    transition: .4s;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 26px;
                    width: 26px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    transition: .4s;
                }
                input:checked + .slider { background-color: #7c4dff; }
                input:focus + .slider { box-shadow: 0 0 1px #7c4dff; }
                input:checked + .slider:before { transform: translateX(26px); }
                .slider.round { border-radius: 34px; }
                .slider.round:before { border-radius: 50%; }

                /* Layout */
                .admin-grid-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                }
                @media (max-width: 1024px) {
                    .admin-grid-layout { grid-template-columns: 1fr; }
                }

                /* Form Styling */
                .form-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                .form-group { margin-bottom: 1.25rem; }
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
                .modern-input, .modern-select, .modern-textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 0.95rem;
                    transition: border-color 0.2s;
                }
                .modern-input:focus { border-color: #7c4dff; outline: none; }
                
                .color-picker-wrapper { display: flex; gap: 0.5rem; }
                .color-input { width: 50px; height: 42px; padding: 0; border: none; cursor: pointer; }
                .color-text-input { flex: 1; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem; }

                /* List Styling */
                .packages-stack { display: flex; flex-direction: column; gap: 1rem; }
                .package-item {
                    background: white;
                    border: 1px solid #f1f5f9;
                    border-left-width: 4px;
                    border-radius: 8px;
                    padding: 1.25rem;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: transform 0.2s;
                }
                .package-item:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
                .package-item.coming-soon { background: #f8fafc; opacity: 0.8; }
                
                .pkg-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.25rem; }
                .pkg-title { font-weight: 700; font-size: 1.1rem; }
                .badge-popular { background: #fffbeb; color: #b45309; font-size: 0.75rem; padding: 0.25rem 0.5rem; borderRadius: 4px; display: flex; align-items: center; gap: 0.25rem; }
                .badge-soon { background: #e2e8f0; color: #475569; font-size: 0.75rem; padding: 0.25rem 0.5rem; borderRadius: 4px; }
                
                .pkg-price { font-weight: 600; color: #334155; margin: 0.25rem 0; }
                .pkg-features-preview { font-size: 0.85rem; color: #64748b; }

                .pkg-actions { display: flex; gap: 0.5rem; }
                .action-btn { width: 36px; height: 36px; border-radius: 6px; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
                .action-btn.edit { background: #eff6ff; color: #3b82f6; }
                .action-btn.edit:hover { background: #dbeafe; }
                .action-btn.delete { background: #fef2f2; color: #ef4444; }
                .action-btn.delete:hover { background: #fee2e2; }

                .btn-submit { background: #7c4dff; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
                .btn-cancel { background: transparent; color: #64748b; border: 1px solid #cbd5e1; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; margin-right: 1rem; }
            `}</style>
        </div>
    );
};

export default HealthPackageManager;
