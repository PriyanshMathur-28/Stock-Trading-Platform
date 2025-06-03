import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const signup = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, {
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
        throw error.response?.data || { message: 'An error occurred during signup' };
    }
};

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password
        });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({ username }));
        }
        
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during login' };
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

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
    isAuthenticated
};

export default authService; 