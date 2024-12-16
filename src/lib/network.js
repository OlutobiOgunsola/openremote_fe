import axios from 'axios';
import { useAuthStore } from '../store/auth.store';
import toast from 'react-hot-toast';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
});

axios.interceptors.response.use(res => { }, err => {
    console.log("error", err);
    if (err.status === 401) {
        toast.error("Token expired. Please log in again.");
    }
});