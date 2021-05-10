import { instance } from "@/utils/request";

export const setCookie = function () {
    return instance({
        url: '/user/setCookie',//登陆
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            data: 'yqq_stat=0; pgv_info=ssid=s3908538665; ts_last=y.qq.com/; ts_refer=ADTAGmyqq; pgv_pvid=6041426216; ts_uid=2394971567; _qpsvr_localtk=0.26982454758098307; ptui_loginuin=1720527130; RK=b1jlJfqvQM; ptcz=3957b6eefeb28f08acbd47e2895708a32cc33dd9177ea961c8d2d057faa24c09; login_type=1; qqmusic_key=Q_H_L_2i1gO260e0h5RbIf_LuEF2gbdsoUonNiHtFse5b49FKTJyxjWOpNSFds7Ix7uAF; wxrefresh_token=; psrf_qqunionid=; wxopenid=; euin=oKSAoe4A7i6ion**; tmeLoginType=2; psrf_access_token_expiresAt=1628393243; qm_keyst=Q_H_L_2i1gO260e0h5RbIf_LuEF2gbdsoUonNiHtFse5b49FKTJyxjWOpNSFds7Ix7uAF; qm_keyst=Q_H_L_2i1gO260e0h5RbIf_LuEF2gbdsoUonNiHtFse5b49FKTJyxjWOpNSFds7Ix7uAF; psrf_qqopenid=8A8EF8D1F2D173E2E823DC0586282A37; wxunionid=; psrf_qqaccess_token=2107AC77A718330229335E0C11AC2163; uin=1720527130; psrf_qqrefresh_token=533A9E5F08FF1D72A67FD0A80DB6B492; psrf_musickey_createtime=1620617243'
        }
    })
};

export const getCookie = function () {
    return instance({
        url: '/user/getCookie',//设置Cookie到浏览器
        method: 'get',
        params: {
            id: '1720527130',
        }
    })
};
export const Cookie = function () {
    return instance({
        url: '/user/Cookie',//查看当前Cookie
        method: 'get',
        params: {
            id: '1720527130',
        }
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



