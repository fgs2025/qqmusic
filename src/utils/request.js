import axios from "axios";

export const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
});

instance.interceptors.request.use((config) => {//请求拦截
    return config;
});

instance.interceptors.response.use((response) => {//响应拦截
    return response;
});