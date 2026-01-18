import { useState, useEffect } from 'react';

export default function PopupAppointments({ showMessage }) {
    const [popupRequests, setPopupRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPopupRequests();
    }, []);

    const loadPopupRequests = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/popup-appointments');
            if (response.ok) {
                const data = await response.json();
                setPopupRequests(data);
            }
        } catch (error) {
            console.error('Error loading popup requests:', error);
            showMessage?.('error', 'Failed to load popup appointment requests');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch('/api/popup-appointments', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus })
            });

            if (response.ok) {
                showMessage?.('success', 'Status updated successfully');
                loadPopupRequests();
            }
        } catch (error) {
            console.error('Error updating status:', error);
            showMessage?.('error', 'Failed to update status');
        }
    };

    const deleteRequest = async (id) => {
        if (!confirm('Are you sure you want to delete this request?')) return;

        try {
            const response = await fetch('/api/popup-appointments', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (response.ok) {
                showMessage?.('success', 'Request deleted successfully');
                loadPopupRequests();
            }
        } catch (error) {
            console.error('Error deleting request:', error);
            showMessage?.('error', 'Failed to delete request');
        }
    };

    if (loading) {
        return <div className="loading-spinner">Loading popup requests...</div>;
    }

    return (
        <div className="popup-appointments-section">
            <div className="section-header">
                <h2>Popup Appointment Requests</h2>
                <button onClick={loadPopupRequests} className="refresh-btn">
                    🔄 Refresh
                </button>
            </div>

            {popupRequests.length === 0 ? (
                <div className="empty-state">
                    <p>No popup appointment requests yet.</p>
                </div>
            ) : (
                <div className="requests-grid">
                    {popupRequests.map((request) => (
                        <div key={request.id} className="request-card">
                            <div className="request-header">
                                <span className={`status-badge status-${request.status}`}>
                                    {request.status}
                                </span>
                                <span className="request-time">
                                    {new Date(request.timestamp).toLocaleString()}
                                </span>
                            </div>

                            <div className="request-details">
                                <div className="detail-row">
                                    <span className="detail-label">👤 Name:</span>
                                    <span className="detail-value">{request.name}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">📱 Phone:</span>
                                    <span className="detail-value">{request.phone}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">✉️ Email:</span>
                                    <span className="detail-value">{request.email}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">📍 Source:</span>
                                    <span className="detail-value">{request.source}</span>
                                </div>
                            </div>

                            <div className="request-actions">
                                <select
                                    value={request.status}
                                    onChange={(e) => updateStatus(request.id, e.target.value)}
                                    className="status-select"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <button
                                    onClick={() => deleteRequest(request.id)}
                                    className="delete-btn"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
