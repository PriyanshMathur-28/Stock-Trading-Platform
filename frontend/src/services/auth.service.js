import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const signup = async (username, email, password) => {
    try {
        const response = await api.post('/signup', {
            username,
            email,
            password
        });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({ username, email }));
        }
        
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during signup';
        throw new Error(errorMessage);
    }
};

const login = async (email, password) => {
    try {
        const response = await api.post('/login', {
            username: email, // Backend expects username field
            password
        });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({ email }));
        }
        
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during login';
        throw new Error(errorMessage);
    }
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const getToken = () => {
    return localStorage.getItem('token');
};

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

// Add request interceptor to include token
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
    getToken,
    isAuthenticated
};

export default authService;