import { instance } from "@/utils/request";

//获取歌单详情
export const albumSongs = function () {
    return instance({
        url: '/top/category',
        method: 'get',
        params: {
            showDetail: 1
        }
    })
};

export const top = function (id) {
    return instance({
        url: '/top',
        method: 'get',
        params: {
            id
        }
    })
};


