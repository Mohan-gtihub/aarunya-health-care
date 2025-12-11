import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simple authentication - you should replace this with proper authentication
        // For now, using environment variables for credentials
        const validUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
        const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

        if (credentials.username === validUsername && credentials.password === validPassword) {
            // Set session
            sessionStorage.setItem('adminAuthenticated', 'true');
            sessionStorage.setItem('adminLoginTime', new Date().getTime().toString());

            // Redirect to admin panel
            router.push('/admin');
        } else {
            setError('Invalid username or password');
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <div className="login-header">
                    <div className="lock-icon">🔐</div>
                    <h1>Admin Login</h1>
                    <p>Aarunya Health Care</p>
                </div>

                {error && (
                    <div className="error-message">
                        ❌ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            required
                            placeholder="Enter username"
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                            placeholder="Enter password"
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Authorized personnel only</p>
                </div>
            </div>
        </div>
    );
}
