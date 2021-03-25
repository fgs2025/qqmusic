import { instance } from "@/utils/request";

export const search = function () {
    return instance({
        url: '/search',//搜索
        method: 'get',
        params: {
            key: '周杰伦',//关键词 必填
            pageNo: 1,//页码，默认 1
            pageSize: 20,//一页返回数量，默认 20
            t: 0,//搜索类型 默认为 0 // 0：单曲，2：歌单，7：歌词，8：专辑，9：歌手，12：mv
        }
    })
};

export const searchHot = function () {
    return instance({
        url: '/search/hot',//获取热搜词
        method: 'get',
    })
};

export const searchQuick = function () {
    return instance({
        url: '/search/quick',//快速搜索
        method: 'get',
        params: {
            key: '周杰伦'//关键词,必填
        }
    })
};