// API Configuration
// In development, use relative URLs (Vite proxy will handle it)
// In production, use the full Render URL
const API_URL = import.meta.env.PROD
    ? 'https://aarunya-health-care.onrender.com'
    : '';

export default API_URL;
