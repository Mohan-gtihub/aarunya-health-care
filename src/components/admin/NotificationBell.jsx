import { useState } from 'react';
import styles from './NotificationBell.module.css';

export default function NotificationBell({
    notifications,
    unreadCount,
    soundEnabled,
    setSoundEnabled,
    browserNotificationsEnabled,
    setBrowserNotificationsEnabled,
    markAsRead,
    markAllAsRead,
    clearNotifications
}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const requestBrowserPermission = async () => {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            setBrowserNotificationsEnabled(permission === 'granted');
        }
    };

    const formatTime = (timestamp) => {
        const now = new Date();
        const diff = now - new Date(timestamp);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <div className={styles.notificationBellContainer}>
            <button
                className={styles.notificationBellButton}
                onClick={() => setShowDropdown(!showDropdown)}
                title="Notifications"
            >
                🔔
                {unreadCount > 0 && (
                    <span className={styles.notificationBadge}>{unreadCount > 99 ? '99+' : unreadCount}</span>
                )}
            </button>

            {showDropdown && (
                <>
                    <div className={styles.notificationOverlay} onClick={() => setShowDropdown(false)} />
                    <div className={styles.notificationDropdown}>
                        <div className={styles.notificationHeader}>
                            <h3>Notifications</h3>
                            <div className={styles.notificationActions}>
                                <button
                                    className={styles.iconBtn}
                                    onClick={() => setShowSettings(!showSettings)}
                                    title="Settings"
                                >
                                    ⚙️
                                </button>
                                {notifications.length > 0 && (
                                    <>
                                        <button
                                            className={styles.iconBtn}
                                            onClick={markAllAsRead}
                                            title="Mark all as read"
                                        >
                                            ✓
                                        </button>
                                        <button
                                            className={styles.iconBtn}
                                            onClick={clearNotifications}
                                            title="Clear all"
                                        >
                                            🗑️
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {showSettings && (
                            <div className={styles.notificationSettings}>
                                <label className={styles.settingItem}>
                                    <input
                                        type="checkbox"
                                        checked={soundEnabled}
                                        onChange={(e) => setSoundEnabled(e.target.checked)}
                                    />
                                    <span>🔊 Sound Alerts</span>
                                </label>
                                <label className={styles.settingItem}>
                                    <input
                                        type="checkbox"
                                        checked={browserNotificationsEnabled}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                requestBrowserPermission();
                                            } else {
                                                setBrowserNotificationsEnabled(false);
                                            }
                                        }}
                                    />
                                    <span>🖥️ Browser Notifications</span>
                                </label>
                            </div>
                        )}

                        <div className={styles.notificationList}>
                            {notifications.length === 0 ? (
                                <div className={styles.notificationEmpty}>
                                    <p>📭 No notifications</p>
                                    <small>You're all caught up!</small>
                                </div>
                            ) : (
                                notifications.map(notification => (
                                    <div
                                        key={notification.id}
                                        className={`${styles.notificationItem} ${notification.read ? styles.read : styles.unread}`}
                                        onClick={() => markAsRead(notification.id)}
                                    >
                                        <div className={styles.notificationContent}>
                                            <div className={styles.notificationTitle}>
                                                {notification.title}
                                            </div>
                                            <div className={styles.notificationMessage}>
                                                {notification.message}
                                            </div>
                                            <div className={styles.notificationDetails}>
                                                {notification.details}
                                            </div>
                                            <div className={styles.notificationTime}>
                                                {formatTime(notification.timestamp)}
                                            </div>
                                        </div>
                                        {!notification.read && (
                                            <div className={styles.notificationUnreadDot}></div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
