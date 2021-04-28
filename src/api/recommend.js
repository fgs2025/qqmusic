import { instance } from "@/utils/request";

export const playlistu = function () {
    return instance({
        url: '/recommend/playlist/u',
        method: 'get',

    })
};
export const playlist = function ( id, pageNo, pageSize ) {
    return instance({
        url: '/recommend/playlist',
        method: 'get',
        params: {
            id: id || 3317,
            pageNo: pageNo || 1,
            pageSize: pageSize || 20
        }
    })
};

