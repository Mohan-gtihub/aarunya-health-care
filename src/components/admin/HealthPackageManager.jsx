import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaStar } from 'react-icons/fa';

const HealthPackageManager = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        subtitle: '',
        price: '',
        color: '#7c4dff',
        popular: false,
        status: 'active',
        features: '' // Stored as new-line separated string in form, array in DB
    });

    useEffect(() => {
        fetchPackages();
    }, []);

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
        <div className="admin-section">
            <div className="section-header">
                <h2>Manage Health Packages</h2>
            </div>

            {/* Add/Edit Form */}
            <div className="admin-card">
                <h3>{isEditing ? 'Edit Package' : 'Add New Package'}</h3>
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Package Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g. Vital Wellness Package"
                            />
                        </div>
                        <div className="form-group">
                            <label>Subtitle (Category/Age)</label>
                            <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleInputChange}
                                placeholder="e.g. Adults 25+"
                            />
                        </div>
                        <div className="form-group">
                            <label>Price (Leave empty for 'Coming Soon')</label>
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="e.g. 2,999"
                            />
                        </div>
                        <div className="form-group">
                            <label>Accent Color</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="color"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleInputChange}
                                    style={{ height: '40px', width: '60px' }}
                                />
                                <input
                                    type="text"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleInputChange}
                                    placeholder="#RRGGBB"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={formData.status} onChange={handleInputChange}>
                                <option value="active">Active</option>
                                <option value="coming_soon">Coming Soon</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Features (One per line)</label>
                        <textarea
                            name="features"
                            value={formData.features}
                            onChange={handleInputChange}
                            rows="5"
                            placeholder="CBC&#10;BP Monitoring&#10;ECG"
                            required
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="popular"
                                checked={formData.popular}
                                onChange={handleInputChange}
                            />
                            Mark as "Most Popular"
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            {isEditing ? 'Update Package' : 'Add Package'}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={resetForm} className="btn btn-secondary">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Packages List */}
            <div className="packages-list-preview" style={{ marginTop: '2rem' }}>
                <h3>Existing Packages</h3>
                {loading ? <p>Loading...</p> : (
                    <div className="grid-list">
                        {packages.map(pkg => (
                            <div key={pkg.id} className="admin-list-item" style={{ borderLeft: `5px solid ${pkg.color}` }}>
                                <div className="item-content">
                                    <h4>{pkg.title} {pkg.popular && <FaStar color="gold" />}</h4>
                                    <p className="text-muted">{pkg.subtitle}</p>
                                    <p><strong>Status:</strong> {pkg.status === 'coming_soon' ? 'Coming Soon' : 'Active'}</p>
                                    <p><strong>Price:</strong> {pkg.price || 'N/A'}</p>
                                    <p><small>{pkg.features?.length || 0} features</small></p>
                                </div>
                                <div className="item-actions">
                                    <button onClick={() => handleEdit(pkg)} className="btn-icon text-blue">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(pkg.id)} className="btn-icon text-red">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {packages.length === 0 && !loading && <p>No packages found.</p>}
            </div>

            <style jsx>{`
                .grid-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1rem;
                }
                .admin-list-item {
                    background: white;
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }
                @media (max-width: 768px) {
                    .form-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default HealthPackageManager;
