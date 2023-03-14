import axios from 'axios';
import baseUrl from './backendUrl';

const axiosClient = axios.create({
    baseURL: baseUrl,
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        throw error;
    }
);

export default axiosClient;
