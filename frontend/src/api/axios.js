import axios from 'axios';

const api = axios.create({
    baseURL: 'https://glorious-invention-v6ggqg5xq69gfwxxp-8000.app.github.dev/api/',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            const currentPath = window.location.pathname;

            if (currentPath !== '/login') {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }

        }
        return Promise.reject(error);
    }
);

export default api;