// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7004/api/app', // Remplacez par votre base URL
    // baseURL: 'https://66b07fc66a693a95b538edbe.mockapi.io', // Remplacez par votre base URL
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
});

export default axiosInstance;
