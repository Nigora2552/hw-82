import axios from "axios";
import {apiUrl} from "./constants.ts";

const axiosApi = axios.create({
    baseURL: apiUrl,
});

axiosApi.defaults.withCredentials = true;

axiosApi.interceptors.response.use((response) => response, async (error) => {

    const originalRequest = error.config;
    if (error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        originalRequest.url !== '/user/token') {
        originalRequest._retry = true;

        try {
            await axios.post(`${apiUrl}/users/token`, {}, {withCredentials: true});
            return axiosApi(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError)
        }
    }
    return Promise.reject(error);
})

export default axiosApi;