import axiosInstance from '../config/axiosConfig';

let shop = localStorage.getItem('shopId');
const jwtToken = localStorage.getItem('token');

const getProducts = async (data) => {
    let shop = localStorage.getItem('shopId');
    const jwtToken = localStorage.getItem('token');

    try {
        const response =  await axiosInstance.get(`/private/${shop}/product`,  {
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

const getProduct = async (id) => {
    let shop = localStorage.getItem('shopId');
    const jwtToken = localStorage.getItem('token');

    try {
        const response =  await axiosInstance.get(`/private/${shop}/product/${id}`,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching order', error);
        throw error;
    }
};

const addProduct = async (data) => {
    try {
        const response =  await axiosInstance.post(`/private/${shop}/product/new`, data, {
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

const updateProduct = async (data) => {

    try {
        const response =  await axiosInstance.put(`/private/${shop}/product/${data.id}`,  data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching order', error);
        throw error;
    }
};

const deleteProduct = async (productId) => {
    try {
        const response = await axiosInstance.delete(`/private/${shop}/product/${productId}`, {
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


export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
