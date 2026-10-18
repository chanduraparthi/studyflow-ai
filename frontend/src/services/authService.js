import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const formatError = (error, fallback) => {
    const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        fallback;
    return { message, error: message, ...(error.response?.data || {}) };
};

const login = async (email, password) => {
    try {
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw formatError(error, 'Login failed. Please check your credentials.');
    }
};

const register = async (username, email, password) => {
    try {
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw formatError(error, 'Registration failed. Please check your details.');
    }
};

const getProfile = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        return response.data;
    } catch (error) {
        throw formatError(error, 'An unknown error occurred');
    }
};

const updateProfile = async (userData) => {
    try {
        const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, userData);
        return response.data;
    } catch (error) {
        throw formatError(error, 'Failed to update profile');
    }
};

const changePassword = async (passwords) => {
    try {
        const response = await axiosInstance.put(API_PATHS.AUTH.CHANGE_PASSWORD, passwords);
        return response.data;
    } catch (error) {
        throw formatError(error, 'Failed to change password');
    }
};

const googleLogin = async (credential) => {
    try {
        const response = await axiosInstance.post(API_PATHS.AUTH.GOOGLE_LOGIN, {
            credential,
        });
        return response.data;
    } catch (error) {
        throw formatError(error, 'Google login failed');
    }
};

const authService = {
    login,
    register,
    getProfile,
    updateProfile,
    changePassword,
    googleLogin,
};

export default authService;