import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const api = ( token = '' ): AxiosInstance => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const config: AxiosRequestConfig = {
        baseURL: apiUrl
    };

    if ( token ) {
        config.headers = { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' };
    }

    return axios.create( config );
};

export const getUrl = {
    login: '/auth/login',
    register: '/auth/register',
    reset: '/auth/reset',
    update: '/auth/update',
    products: '/products',
    categories: '/categories',
    favourites: '/user/favourites',
    basket: '/user/basket'
};

export default api;
