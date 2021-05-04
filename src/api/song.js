import { instance } from "@/utils/request";

//播放链接
export const songUrls = function (songId) {
    return instance({
        url: '/song/urls',
        method: 'get',
        params: {
            id: songId
        }
    })
};


export const song = function (songmid) {
    return instance({
        url: '/song',
        method: 'get',
        params: {
            songmid: songmid
        }
    })
};

export const songUrl = function (songmid) {
    return instance({
        url: '/song/url',
        method: 'get',
        params: {
            id: songmid
        }
    })
};

