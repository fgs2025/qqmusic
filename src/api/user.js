import { instance } from "@/utils/request";

export const setCookie = function () {
    return instance({
        url: '/user/setCookie',//登陆
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            data: `__51cke__=; uin=1720527130; __tins__20118467=%7B%22sid%22%3A%201616898789209%2C%20%22vd%22%3A%2011%2C%20%22expires%22%3A%201616902134038%7D; __51laig__=11`
        }
    })
};

export const getCookie = function () {
    return instance({
        url: '/user/cookie',//查看当前Cookie
        method: 'get',
    })
};

export const detail = function () {
    return instance({
        url: '/user/detail',//用户主页信息
        method: 'get',
        params: {
            id: '1720527130',
        }
    })
};