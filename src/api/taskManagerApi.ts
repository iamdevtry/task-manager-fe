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
    getListTask: async () => {
        const url = '/tasks';
        const config = {
            headers: authHeader(),
        };
        return axiosClient.get(url, config);
    },
    getListActivity: async () => {
        const url = '/activities';
        const config = {
            headers: authHeader(),
        };
        return axiosClient.get(url, config);
    },
    addActivity: async (params: any) => {
        const url = '/activities';
        const config = {
            headers: authHeader(),
        };
        return axiosClient.post(url, params, config);
    },
};
export default devtryBlogApi;
