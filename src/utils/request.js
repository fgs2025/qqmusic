import axios from "axios";

export const instance = axios.create({//创建axios实例
    baseURL: "http://120.78.214.15:3300",
    // timeout: 5000,
});

instance.interceptors.request.use((config) => {//请求拦截
    return config;
});

instance.interceptors.response.use(//响应拦截
    response => {
        // if (response.data.result !== 100) {
        //     return Promise.reject(response.data)
        // } else {
            return response.data
        // }
    },
    error => {
        return Promise.reject(error);
    }
);
