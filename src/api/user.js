import { instance } from "@/utils/request";

export const setCookie = function () {
    return instance({
        url: '/user/setCookie',//登陆
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            data: 'ts_refer=ADTAGmyqq; pgv_pvid=7537791371; ts_uid=7607999063; ptui_loginuin=1720527130; RK=Q9itY/quTM; ptcz=26083d368328436fe718fe84c579f0ffe32b405866a41ffaa536670c28d5e8a2; tmeLoginType=2; euin=oKSAoe4A7i6ion**; wxrefresh_token=; psrf_qqrefresh_token=533A9E5F08FF1D72A67FD0A80DB6B492; psrf_qqopenid=8A8EF8D1F2D173E2E823DC0586282A37; wxunionid=; wxopenid=; psrf_qqaccess_token=2107AC77A718330229335E0C11AC2163; psrf_qqunionid=; uin=1720527130; yq_index=0; yqq_stat=0; pgv_info=ssid=s7902324008; ts_last=y.qq.com/; _qpsvr_localtk=0.45042288875824066; login_type=1; qm_keyst=Q_H_L_2evVL260eKWKDnQweBVRZaX6mMyQ1qZ9GZ11LS_lsLICvJTIf6kvUhBt7-h8DaE; qm_keyst=Q_H_L_2evVL260eKWKDnQweBVRZaX6mMyQ1qZ9GZ11LS_lsLICvJTIf6kvUhBt7-h8DaE; psrf_musickey_createtime=1620410266; psrf_access_token_expiresAt=1628186266; qqmusic_key=Q_H_L_2evVL260eKWKDnQweBVRZaX6mMyQ1qZ9GZ11LS_lsLICvJTIf6kvUhBt7-h8DaE'
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



