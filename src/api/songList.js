import { instance } from "@/utils/request";

//获取歌单详情
export const songlist = function (id) {
    return instance({
        url: '/songlist',
        method: 'get',
        params: {
            id: id
        }
    })
};


