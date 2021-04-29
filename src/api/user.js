import { instance } from "@/utils/request";

export const setCookie = function () {
    return instance({
        url: '/user/setCookie',//登陆
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            data: 'yqq_stat=0; pgv_info=ssid=s1078303550; ts_last=y.qq.com/; ts_refer=ADTAGmyqq; pgv_pvid=8247723680; ts_uid=5254077552; fqm_pvqid=9b7d053e-cfa2-438a-89d6-62b234f8df94; fqm_sessionid=932e1ac8-b1c5-4da2-b1ce-ea19724521c0; _qpsvr_localtk=0.3602528940761054; ptui_loginuin=1720527130; RK=B8itM/quXu; ptcz=02211462e67a7a82b7b490b815d442d954e61a7d2fec2e6a6d282dcd9eb721d2; uin=1720527130; tmeLoginType=2; wxopenid=; qm_keyst=Q_H_L_2iEG9260e4bhloR7cugdXIQz2HQ84gNcEvggwCrcwmNzVR_0v2KcaXYkxcO5r45; wxrefresh_token=; psrf_qqaccess_token=2107AC77A718330229335E0C11AC2163; psrf_qqunionid=; psrf_access_token_expiresAt=1627383787; qm_keyst=Q_H_L_2iEG9260e4bhloR7cugdXIQz2HQ84gNcEvggwCrcwmNzVR_0v2KcaXYkxcO5r45; qqmusic_key=Q_H_L_2iEG9260e4bhloR7cugdXIQz2HQ84gNcEvggwCrcwmNzVR_0v2KcaXYkxcO5r45; psrf_qqrefresh_token=533A9E5F08FF1D72A67FD0A80DB6B492; psrf_musickey_createtime=1619607787; psrf_qqopenid=8A8EF8D1F2D173E2E823DC0586282A37; euin=oKSAoe4A7i6ion**; wxunionid='
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



