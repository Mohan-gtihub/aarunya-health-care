export default function FounderManagement({
    founderInfo,
    founderForm,
    setFounderForm,
    loading,
    uploadingImage,
    handleFounderSubmit,
    handleFounderImageUpload
}) {
    return (
        <div className="founder-management-section">
            <div className="section-header">
                <h2>👤 Founder Information</h2>
                <p>Manage founder details displayed on the About page</p>
            </div>

            <div className="form-card">
                <form onSubmit={handleFounderSubmit} className="admin-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Name *</label>
                            <input
                                type="text"
                                value={founderForm.name}
                                onChange={(e) => setFounderForm({ ...founderForm, name: e.target.value })}
                                required
                                placeholder="Mr. Vaishnav"
                            />
                        </div>

                        <div className="form-group">
                            <label>Title *</label>
                            <input
                                type="text"
                                value={founderForm.title}
                                onChange={(e) => setFounderForm({ ...founderForm, title: e.target.value })}
                                required
                                placeholder="Founder & Director"
                            />
                        </div>

                        <div className="form-group">
                            <label>Years of Experience</label>
                            <input
                                type="number"
                                value={founderForm.years_experience}
                                onChange={(e) => setFounderForm({ ...founderForm, years_experience: e.target.value })}
                                placeholder="20"
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Quote/Message</label>
                            <textarea
                                value={founderForm.quote}
                                onChange={(e) => setFounderForm({ ...founderForm, quote: e.target.value })}
                                rows="3"
                                placeholder="Inspirational quote or message..."
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Biography</label>
                            <textarea
                                value={founderForm.bio}
                                onChange={(e) => setFounderForm({ ...founderForm, bio: e.target.value })}
                                rows="6"
                                placeholder="Detailed professional biography..."
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Profile Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFounderImageUpload}
                                disabled={uploadingImage}
                            />
                            {uploadingImage && <p className="upload-status">Uploading...</p>}
                            {founderForm.image_url && (
                                <div className="image-preview">
                                    <img
                                        src={founderForm.image_url}
                                        alt="Founder Preview"
                                        style={{ maxWidth: '300px', marginTop: '10px', borderRadius: '8px' }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : '✓ Save Founder Information'}
                    </button>
                </form>
            </div>

            {founderInfo && (
                <div className="founder-preview-card">
                    <h3>Current Founder Information</h3>
                    <div className="founder-preview">
                        {founderInfo.image_url && (
                            <img src={founderInfo.image_url} alt={founderInfo.name} className="founder-image" />
                        )}
                        <div className="founder-details">
                            <h4>{founderInfo.name}</h4>
                            <p className="title">{founderInfo.title}</p>
                            {founderInfo.years_experience && (
                                <p className="experience">{founderInfo.years_experience}+ years of experience</p>
                            )}
                            {founderInfo.quote && (
                                <blockquote className="quote">"{founderInfo.quote}"</blockquote>
                            )}
                            {founderInfo.bio && (
                                <p className="bio">{founderInfo.bio}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
