import axios from "axios";
import {apiUrl} from "./constants.ts";

const axiosApi = axios.create({
    baseURL: apiUrl,
});

axiosApi.defaults.withCredentials = true;

export  default axiosApi;