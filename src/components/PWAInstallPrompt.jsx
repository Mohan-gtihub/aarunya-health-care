import { useState, useEffect } from 'react';
import styles from './PWAInstallPrompt.module.css';

export default function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if iOS
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(iOS);

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
            setIsInstalled(true);
            return;
        }

        // Android/Chrome install prompt
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);

            // Check if user has dismissed before
            const dismissed = localStorage.getItem('pwa-install-dismissed');
            const dismissedTime = localStorage.getItem('pwa-install-dismissed-time');

            // Show again after 7 days
            if (dismissed && dismissedTime) {
                const daysSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
                if (daysSinceDismissed < 7) {
                    return;
                }
            }

            // Show prompt after 3 seconds
            setTimeout(() => setShowPrompt(true), 3000);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // For iOS, show manual instructions after 3 seconds
        if (iOS && !window.navigator.standalone) {
            const dismissed = localStorage.getItem('pwa-install-dismissed-ios');
            if (!dismissed) {
                setTimeout(() => setShowPrompt(true), 3000);
            }
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('✅ PWA installed');
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
        localStorage.setItem('pwa-install-dismissed', 'true');
        localStorage.setItem('pwa-install-dismissed-time', Date.now().toString());
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        if (isIOS) {
            localStorage.setItem('pwa-install-dismissed-ios', 'true');
        } else {
            localStorage.setItem('pwa-install-dismissed', 'true');
            localStorage.setItem('pwa-install-dismissed-time', Date.now().toString());
        }
    };

    if (!showPrompt || isInstalled) return null;

    return (
        <div className={styles.installPrompt}>
            <div className={styles.promptContent}>
                <button className={styles.closeBtn} onClick={handleDismiss} aria-label="Close">
                    ✕
                </button>

                <div className={styles.promptIcon}>📱</div>

                <div className={styles.promptText}>
                    <h3>Install Aarunya Admin App</h3>
                    {isIOS ? (
                        <div className={styles.iosInstructions}>
                            <p>Install this app on your iPhone:</p>
                            <ol>
                                <li>Tap the <strong>Share</strong> button <span className={styles.shareIcon}>⎙</span></li>
                                <li>Scroll down and tap <strong>"Add to Home Screen"</strong> <span className={styles.addIcon}>➕</span></li>
                                <li>Tap <strong>"Add"</strong> in the top right</li>
                            </ol>
                        </div>
                    ) : (
                        <>
                            <p>Get quick access to manage appointments and bookings</p>
                            <ul className={styles.benefits}>
                                <li>✅ Instant access from home screen</li>
                                <li>🔔 Real-time notifications</li>
                                <li>⚡ Faster loading</li>
                                <li>📴 Works offline</li>
                            </ul>
                        </>
                    )}
                </div>

                {!isIOS && (
                    <div className={styles.promptActions}>
                        <button onClick={handleInstall} className={styles.installBtn}>
                            📥 Install App
                        </button>
                        <button onClick={handleDismiss} className={styles.laterBtn}>
                            Maybe Later
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
