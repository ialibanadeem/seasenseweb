import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for injecting auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('seasense_auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for catching global unauthorized events
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            Cookies.remove('seasense_auth_token');
            if (typeof window !== 'undefined') {
                localStorage.removeItem('seasense_user');
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;

