// src/services/orderService.js
import axiosInstance from '../config/axiosConfig';

const getJWT = () => {
    return localStorage.getItem('jwtToken');
};

const getOrdersByShop = async (data) => {
    let shop = localStorage.getItem('shopId');
    const jwtToken = localStorage.getItem('token');

    try {
        const response =  await axiosInstance.get(`/private/${shop}/order/`,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching orders', error);
        throw error;
    }
};

const sendOrder = async (orderId) => {
    let shop = localStorage.getItem('shopId');
    const jwtToken = localStorage.getItem('token');

    try {
        const response =  await axiosInstance.post(`/private/${shop}/order/send/${orderId}`,  [],{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching orders', error);
        throw error;
    }
};


export { getOrdersByShop, sendOrder };
