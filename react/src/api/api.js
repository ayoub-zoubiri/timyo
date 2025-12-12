import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

export const getCsrfCookie = () => {
    return axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
    });
};

export default api;
