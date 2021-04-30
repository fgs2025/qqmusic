import { instance } from "@/utils/request";

//为你推荐歌单
export const playlistu = function () {
    return instance({
        url: '/recommend/playlist/u',
        method: 'get',
    })
};

//按分类推荐歌单
export const playlist = function (id, pageNo, pageSize) {
    return instance({
        url: '/recommend/playlist',
        method: 'get',
        params: {
            id: id || 3317,//分类id，默认为 3317 // 3317: 官方歌单，59：经典，71：情歌，3056：网络歌曲，64：KTV热歌
            pageNo: pageNo || 1,// 页码，默认为 1
            pageSize: pageSize || 20//每页返回数量，默认为 20
        }
    })
};
