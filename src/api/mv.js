import { instance } from "@/utils/request";

//获取歌单详情
export const mvUrl = function (id) {
    return instance({
        url: '/mv/url',
        method: 'get',
        params: {
            id
        }
    })
};


