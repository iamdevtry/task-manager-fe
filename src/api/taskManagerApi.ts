import axiosClient from './axiosClient';
import authHeader from '../services/auth/authHeader';

const devtryBlogApi = {
    login: async (params: any) => {
        const url = '/login';
        return axiosClient.post(url, params);
    },
    getInforUser: async (id: Number) => {
        const url = `/users/${id}`;
        return axiosClient.get(url);
    },
};
export default devtryBlogApi;
