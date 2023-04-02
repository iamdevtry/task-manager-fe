import axiosClient from './axiosClient';
import authHeader from '../services/auth/authHeader';

const devtryBlogApi = {
    login: async (params: any) => {
        const url = '/login';
        return axiosClient.post(url, params);
    },
    register: async (params: any) => {
        const url = '/register';
        return axiosClient.post(url, params);
    },
    getInforUser: async (id: Number) => {
        const url = `/users/${id}`;
        return axiosClient.get(url);
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
    deleteActivity: async (id: Number) => {
        const url = `/activities/${id}`;
        const config = {
            headers: authHeader(),
        };
        return axiosClient.delete(url, config);
    },
    getActivity: async (id: Number) => {
        const url = `/activities/${id}`;
        const config = {
            headers: authHeader(),
        };
        return axiosClient.get(url, config);
    },
    updateActivity: async (params: any) => {
        const url = `/activities/${params.id}`;
        const config = {
            headers: authHeader(),
        };
        return axiosClient.put(url, params, config);
    },
    updateStatusActivity: async (params: any) => {
        const url = `/activities`;
        const config = {
            headers: authHeader(),
        };
        return axiosClient.put(url, params, config);
    },
    getListCommentsByActivityId: async (id: Number) => {
        const url = `/comments/${id}`;
        const config = {
            headers: authHeader(),
        };
        return axiosClient.get(url, config);
    },
    addComment: async (params: any) => {
        const url = '/comments';
        const config = {
            headers: authHeader(),
        };
        return axiosClient.post(url, params, config);
    },
    deleteComment: async (id: Number) => {
        const url = `/comments/${id}`;
        const config = {
            headers: authHeader(),
        };
        return axiosClient.delete(url, config);
    },
    getListTask: async () => {
        const url = '/tasks';
        const config = {
            headers: authHeader(),
        };
        return axiosClient.get(url, config);
    },
    addTask: async (params: any) => {
        console.log(params);
        const url = '/tasks';
        const config = {
            headers: authHeader(),
        };
        return axiosClient.post(url, params, config);
    },
    deleteTask: async (id: any) => {
        const url = `/tasks/${id}`;
        const config = {
            headers: authHeader(),
        };
        return axiosClient.delete(url, config);
    },
    updateTask: async (params: any) => {
        console.log(params);
        const url = `/tasks/${params.id}`;
        const config = {
            headers: authHeader(),
        };
        return axiosClient.put(url, params, config);
    },
};
export default devtryBlogApi;
