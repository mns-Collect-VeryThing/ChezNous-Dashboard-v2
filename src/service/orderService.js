// src/services/orderService.js
import axiosInstance from '../config/axiosConfig';

const getOrders = async () => {
    try {
        const response = await axiosInstance.get('/orders');
        return response.data;
    } catch (error) {
        console.error('Error fetching orders', error);
        throw error;
    }
};


export { getOrders };
