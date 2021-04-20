import { instance } from "@/utils/request";

export const search = function ({ key, pageNo, pageSize, t }) {
    return instance({
        url: '/search',//搜索
        method: 'get',
        params: {
            key: key,//关键词 必填
            pageNo: pageNo || 1,//页码，默认 1
            pageSize: pageSize || 20,//一页返回数量，默认 20
            t: t || 0,//搜索类型 默认为 0 // 0：单曲，2：歌单，7：歌词，8：专辑，9：歌手，12：mv
        }
    })
};

export const searchHot = function () {
    return instance({
        url: '/search/hot',//获取热搜词
        method: 'get',
    })
};

export const searchQuick = function (data) {
    return instance({
        url: '/search/quick',//快速搜索
        method: 'get',
        params: {
            key: data//关键词,必填
        }
    })
};