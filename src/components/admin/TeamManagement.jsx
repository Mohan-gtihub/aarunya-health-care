import { useState } from 'react';

export default function TeamManagement({
    teamMembers,
    teamForm,
    setTeamForm,
    editingTeamMember,
    setEditingTeamMember,
    showTeamEditModal,
    setShowTeamEditModal,
    loading,
    uploadingImage,
    handleTeamSubmit,
    updateTeamMember,
    deleteTeamMember,
    handleTeamImageUpload
}) {
    return (
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
                                    <img src={teamForm.image_url} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '8px' }} />
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
                    <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
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
                                                <img src={editingTeamMember.image_url} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '8px' }} />
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
    );
}
