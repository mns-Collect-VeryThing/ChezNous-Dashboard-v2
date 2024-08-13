// src/services/orderService.js
import axiosInstance from '../config/axiosConfig';


const getJWT = () => {
    return localStorage.getItem('jwtToken');
};


const postLogin = async (data) => {
    try {
        return await axiosInstance.post('/login_check', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching orders', error);
        let response;
        response = { status: 401, message: 'Unauthorized' };
        return response;
    }
};

const getShopByUser = async (userId) => {
    const jwtToken = localStorage.getItem('token');

    try {
        let base64 = btoa(unescape(encodeURIComponent(userId)))
        return await axiosInstance.get(`/private/shop/user/${base64}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
        });
    } catch (error) {
        console.error('Error fetching orders', error);
        let response;
        response = { status: 401, message: 'Unauthorized' };
        return response;
    }
};


export { postLogin, getShopByUser };
