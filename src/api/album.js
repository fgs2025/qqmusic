import { instance } from "@/utils/request";

//获取歌单详情
export const albumSongs = function (id) {
    return instance({
        url: '/album/songs',
        method: 'get',
        params: {
            albummid: id
        }
    })
};


