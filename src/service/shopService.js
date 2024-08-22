// src/services/orderService.js
import axiosInstance from '../config/axiosConfig';


const getJWT = () => {
    return localStorage.getItem('jwtToken');
};


const getStatsByShop = async (data) => {
    let shop = localStorage.getItem('shopId');
    const jwtToken = localStorage.getItem('token');

    try {
        const response =  await axiosInstance.get(`/private/shop/${shop}/stats`,  {
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


const getShops = async (data) => {
    const jwtToken = localStorage.getItem('token');

    try {
        const response = await axiosInstance.get(`/private/dashboard/shops`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
        });
        return response.data
    } catch (error) {
        console.error('Error fetching orders', error);
        let response;
        response = { status: 401, message: 'Unauthorized' };
        return response;
    }
};

export { getStatsByShop, getShops };
