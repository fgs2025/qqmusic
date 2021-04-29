import { instance } from "@/utils/request";

export const setCookie = function () {
    return instance({
        url: '/user/setCookie',//登陆
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            data: 'ptui_loginuin=1720527130; RK=B8itM/quXu; ptcz=595e34cc1c3c8707da5b11ca9b6fd2eb770816a85cc9030962e8bbdb69691330; psrf_qqrefresh_token=533A9E5F08FF1D72A67FD0A80DB6B492; psrf_qqaccess_token=2107AC77A718330229335E0C11AC2163; psrf_qqunionid=; euin=oKSAoe4A7i6ion**; wxunionid=; uin=1720527130; wxopenid=; tmeLoginType=2; wxrefresh_token=; psrf_qqopenid=8A8EF8D1F2D173E2E823DC0586282A37; ts_refer=ADTAGmyqq; pgv_pvid=1781619125; ts_uid=4115880586; yq_index=0; yqq_stat=0; pgv_info=ssid=s1134027989; ts_last=y.qq.com/; _qpsvr_localtk=0.9028684362196193; qm_keyst=Q_H_L_2K0iA260eGe44w78SoM6-f3Rpxqv4ICSjN731-HRFYzCFUwattlEGEh7CWMbwq7; psrf_musickey_createtime=1619701765; qqmusic_key=Q_H_L_2K0iA260eGe44w78SoM6-f3Rpxqv4ICSjN731-HRFYzCFUwattlEGEh7CWMbwq7; qm_keyst=Q_H_L_2K0iA260eGe44w78SoM6-f3Rpxqv4ICSjN731-HRFYzCFUwattlEGEh7CWMbwq7; psrf_access_token_expiresAt=1627477765'
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



