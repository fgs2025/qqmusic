import { instance } from "@/utils/request";
import store from '../store'
export const setCookie = function (Cookie) {
    return instance({
        url: '/user/setCookie',//登陆
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            data:Cookie,
        }
    })
};

export const getCookie = function () {
    return instance({
        url: '/user/getCookie',//设置Cookie到浏览器
        method: 'get',
        params: {
            id: store.getters.getUserQQ,
        }
    })
};
export const Cookie = function () {
    return instance({
        url: '/user/Cookie',//查看当前Cookie
        method: 'get',
        params: {
            id: store.getters.getUserQQ,
        }
    })
};

export const detail = function () {
    return instance({
        url: '/user/detail',//用户主页信息
        method: 'get',
        params: {
            id: store.getters.getUserQQ,
        }
    })
};



