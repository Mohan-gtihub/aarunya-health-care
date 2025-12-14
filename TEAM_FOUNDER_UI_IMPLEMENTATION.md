# Team and Founder UI Sections - Add to admin.jsx

## Location: Add before the closing `</div></div>` at the end of admin-content section (around line 2410)

```javascript
                {/* TEAM MEMBERS SECTION */}
                {activeTab === 'team' && (
                    <div className="team-management-section">
                        <div className="section-header">
                            <h2>👥 Team Members Management</h2>
                            <p>Manage your team members displayed on the About page</p>
                        </div>

                        {/* Add Team Member Form */}
                        <div className="form-card">
                            <h3>➕ Add New Team Member</h3>
                            <form onSubmit={handleTeamSubmit} className="admin-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Name *</label>
                                        <input
                                            type="text"
                                            value={teamForm.name}
                                            onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                                            required
                                            placeholder="Dr. John Doe"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Role/Title *</label>
                                        <input
                                            type="text"
                                            value={teamForm.role}
                                            onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                                            required
                                            placeholder="MBBS, MD"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Department</label>
                                        <input
                                            type="text"
                                            value={teamForm.department}
                                            onChange={(e) => setTeamForm({ ...teamForm, department: e.target.value })}
                                            placeholder="Cardiology"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Display Order</label>
                                        <input
                                            type="number"
                                            value={teamForm.display_order}
                                            onChange={(e) => setTeamForm({ ...teamForm, display_order: parseInt(e.target.value) })}
                                            placeholder="0"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={teamForm.email}
                                            onChange={(e) => setTeamForm({ ...teamForm, email: e.target.value })}
                                            placeholder="doctor@example.com"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>LinkedIn URL</label>
                                        <input
                                            type="url"
                                            value={teamForm.linkedin_url}
                                            onChange={(e) => setTeamForm({ ...teamForm, linkedin_url: e.target.value })}
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Bio</label>
                                        <textarea
                                            value={teamForm.bio}
                                            onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                                            rows="4"
                                            placeholder="Brief professional biography..."
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Profile Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleTeamImageUpload(e, false)}
                                            disabled={uploadingImage}
                                        />
                                        {uploadingImage && <p className="upload-status">Uploading...</p>}
                                        {teamForm.image_url && (
                                            <div className="image-preview">
                                                <img src={teamForm.image_url} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={teamForm.active}
                                                onChange={(e) => setTeamForm({ ...teamForm, active: e.target.checked })}
                                            />
                                            Active (Show on website)
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className="btn-primary" disabled={loading}>
                                    {loading ? 'Adding...' : '✓ Add Team Member'}
                                </button>
                            </form>
                        </div>

                        {/* Team Members List */}
                        <div className="data-table-container">
                            <h3>Current Team Members ({teamMembers.length})</h3>
                            {loading ? (
                                <div className="loading-state">
                                    <div className="loading-spinner"></div>
                                    <p>Loading team members...</p>
                                </div>
                            ) : teamMembers.length === 0 ? (
                                <p className="empty-state">No team members yet. Add your first team member above!</p>
                            ) : (
                                <div className="team-grid">
                                    {teamMembers.map((member) => (
                                        <div key={member.id} className="team-member-card">
                                            <div className="member-image">
                                                <img 
                                                    src={member.image_url || 'https://via.placeholder.com/150'} 
                                                    alt={member.name}
                                                />
                                                {!member.active && <span className="inactive-badge">Inactive</span>}
                                            </div>
                                            <div className="member-info">
                                                <h4>{member.name}</h4>
                                                <p className="role">{member.role}</p>
                                                {member.department && <p className="department">📍 {member.department}</p>}
                                                {member.email && <p className="email">📧 {member.email}</p>}
                                                <p className="order">Order: {member.display_order}</p>
                                            </div>
                                            <div className="member-actions">
                                                <button 
                                                    className="btn-edit"
                                                    onClick={() => {
                                                        setEditingTeamMember(member);
                                                        setShowTeamEditModal(true);
                                                    }}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button 
                                                    className="btn-delete"
                                                    onClick={() => deleteTeamMember(member.id)}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Edit Team Member Modal */}
                        {showTeamEditModal && editingTeamMember && (
                            <div className="modal-overlay" onClick={() => setShowTeamEditModal(false)}>
                                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                    <div className="modal-header">
                                        <h3>✏️ Edit Team Member</h3>
                                        <button className="close-btn" onClick={() => setShowTeamEditModal(false)}>×</button>
                                    </div>
                                    <form onSubmit={updateTeamMember}>
                                        <div className="modal-body">
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Name *</label>
                                                    <input
                                                        type="text"
                                                        value={editingTeamMember.name}
                                                        onChange={(e) => setEditingTeamMember({ ...editingTeamMember, name: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label>Role/Title *</label>
                                                    <input
                                                        type="text"
                                                        value={editingTeamMember.role}
                                                        onChange={(e) => setEditingTeamMember({ ...editingTeamMember, role: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label>Department</label>
                                                    <input
                                                        type="text"
                                                        value={editingTeamMember.department || ''}
                                                        onChange={(e) => setEditingTeamMember({ ...editingTeamMember, department: e.target.value })}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label>Display Order</label>
                                                    <input
                                                        type="number"
                                                        value={editingTeamMember.display_order}
                                                        onChange={(e) => setEditingTeamMember({ ...editingTeamMember, display_order: parseInt(e.target.value) })}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        value={editingTeamMember.email || ''}
                                                        onChange={(e) => setEditingTeamMember({ ...editingTeamMember, email: e.target.value })}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label>LinkedIn URL</label>
                                                    <input
                                                        type="url"
                                                        value={editingTeamMember.linkedin_url || ''}
                                                        onChange={(e) => setEditingTeamMember({ ...editingTeamMember, linkedin_url: e.target.value })}
                                                    />
                                                </div>

                                                <div className="form-group full-width">
                                                    <label>Bio</label>
                                                    <textarea
                                                        value={editingTeamMember.bio || ''}
                                                        onChange={(e) => setEditingTeamMember({ ...editingTeamMember, bio: e.target.value })}
                                                        rows="4"
                                                    />
                                                </div>

                                                <div className="form-group full-width">
                                                    <label>Profile Image</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleTeamImageUpload(e, true)}
                                                        disabled={uploadingImage}
                                                    />
                                                    {uploadingImage && <p className="upload-status">Uploading...</p>}
                                                    {editingTeamMember.image_url && (
                                                        <div className="image-preview">
                                                            <img src={editingTeamMember.image_url} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="form-group">
                                                    <label className="checkbox-label">
                                                        <input
                                                            type="checkbox"
                                                            checked={editingTeamMember.active}
                                                            onChange={(e) => setEditingTeamMember({ ...editingTeamMember, active: e.target.checked })}
                                                        />
                                                        Active (Show on website)
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn-secondary" onClick={() => setShowTeamEditModal(false)}>
                                                Cancel
                                            </button>
                                            <button type="submit" className="btn-primary" disabled={loading}>
                                                {loading ? 'Saving...' : '✓ Save Changes'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* FOUNDER INFO SECTION */}
                {activeTab === 'founder' && (
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
                                                <img src={founderForm.image_url} alt="Founder Preview" style={{ maxWidth: '300px', marginTop: '10px', borderRadius: '8px' }} />
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
                )}
```

## CSS Additions for admin.css

Add these styles to improve the UI:

```css
/* Team Members Management */
.team-management-section,
.founder-management-section {
    padding: 20px;
}

.section-header {
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e0e0e0;
}

.section-header h2 {
    margin: 0 0 10px 0;
    color: #2c3e50;
    font-size: 28px;
}

.section-header p {
    margin: 0;
    color: #7f8c8d;
    font-size: 14px;
}

.form-card {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 30px;
}

.form-card h3 {
    margin: 0 0 20px 0;
    color: #34495e;
    font-size: 20px;
}

.admin-form .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 25px;
}

.admin-form .form-group.full-width {
    grid-column: 1 / -1;
}

.admin-form .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #2c3e50;
    font-size: 14px;
}

.admin-form input[type="text"],
.admin-form input[type="email"],
.admin-form input[type="url"],
.admin-form input[type="number"],
.admin-form textarea,
.admin-form select {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
}

.admin-form input:focus,
.admin-form textarea:focus,
.admin-form select:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.admin-form textarea {
    resize: vertical;
    font-family: inherit;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
    width: auto;
    cursor: pointer;
}

.upload-status {
    color: #3498db;
    font-size: 13px;
    margin-top: 8px;
}

.image-preview {
    margin-top: 15px;
}

.image-preview img {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Team Grid */
.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.team-member-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-member-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.member-image {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.member-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.inactive-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #e74c3c;
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}

.member-info {
    padding: 20px;
}

.member-info h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 18px;
}

.member-info .role {
    color: #7f8c8d;
    font-size: 14px;
    margin: 0 0 10px 0;
}

.member-info .department,
.member-info .email,
.member-info .order {
    font-size: 13px;
    color: #95a5a6;
    margin: 5px 0;
}

.member-actions {
    display: flex;
    gap: 10px;
    padding: 15px 20px;
    background: #f8f9fa;
    border-top: 1px solid #e0e0e0;
}

.btn-edit,
.btn-delete {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-edit {
    background: #3498db;
    color: white;
}

.btn-edit:hover {
    background: #2980b9;
}

.btn-delete {
    background: #e74c3c;
    color: white;
}

.btn-delete:hover {
    background: #c0392b;
}

/* Founder Preview */
.founder-preview-card {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.founder-preview-card h3 {
    margin: 0 0 20px 0;
    color: #34495e;
}

.founder-preview {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 30px;
    align-items: start;
}

.founder-image {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.founder-details h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 24px;
}

.founder-details .title {
    color: #7f8c8d;
    font-size: 16px;
    margin: 0 0 15px 0;
}

.founder-details .experience {
    color: #3498db;
    font-weight: 600;
    margin: 0 0 20px 0;
}

.founder-details .quote {
    font-style: italic;
    color: #34495e;
    border-left: 4px solid #3498db;
    padding-left: 20px;
    margin: 20px 0;
}

.founder-details .bio {
    color: #7f8c8d;
    line-height: 1.6;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #95a5a6;
    font-size: 16px;
}

/* Responsive */
@media (max-width: 768px) {
    .founder-preview {
        grid-template-columns: 1fr;
    }
    
    .team-grid {
        grid-template-columns: 1fr;
    }
}
```

## Instructions:
1. Find line ~2410 in admin.jsx (before the closing `</div></div>`)
2. Insert the Team and Founder sections above
3. Add the CSS to admin.css
4. Test the functionality

This completes the Team and Founder management system!
