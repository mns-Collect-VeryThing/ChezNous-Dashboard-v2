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

const checkIfAdmin = async (userId) => {
    const jwtToken = localStorage.getItem('token');

    try {
        let base64 = btoa(unescape(encodeURIComponent(userId)))
        return await axiosInstance.get(`/private/dashboard/checkIfAdmin/${base64}`, {
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

const getLogedUser = async () => {
    const jwtToken = localStorage.getItem('token');
    try {
        let shop = localStorage.getItem('shopId');

        return await axiosInstance.get(`/private/shop/${shop}/owner`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
        });
    } catch (error) {
        return { status: 401, message: 'Unauthorized' };
    }
};


export { postLogin, checkIfAdmin, getLogedUser };
