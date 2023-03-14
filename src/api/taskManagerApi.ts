import axiosClient from './axiosClient';
import authHeader from '../services/auth/authHeader';

const devtryBlogApi = {
    login: async (params: any) => {
        const url = '/login';
        return axiosClient.post(url, params);
    },
};
export default devtryBlogApi;
