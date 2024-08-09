// src/services/orderService.js
import axiosInstance from '../config/axiosConfig';

const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/articles/articles');
        return response.data;
    } catch (error) {
        console.error('Error fetching orders', error);
        throw error;
    }
};

const getProduct = async (data) => {
    try {
        const response = await axiosInstance.get('articles/article?idArticle=' + data);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders', error);
        throw error;
    }
};

const addProduct = async (data) => {
    try {
        const response = await axiosInstance.post('articles/article', data);
        // const response = await axiosInstance.get('/product/' + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders', error);
        throw error;
    }
};

const updateProduct = async (data) => {
    try {
        const response = await axiosInstance.put('articles/article', data);
        // const response = await axiosInstance.get('/product/' + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders', error);
        throw error;
    }
};

const deleteProduct = async (data) => {
    try {
        const response = await axiosInstance.delete('articles/article?idArticle=' + data);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders', error);
        throw error;
    }
};


export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
