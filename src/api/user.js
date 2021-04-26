import { instance } from "@/utils/request";

export const setCookie = function () {
    return instance({
        url: '/user/setCookie',//登陆
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            data: 'pgv_pvid=5663537920; ts_uid=3400591506; ptui_loginuin=1720527130; RK=C9itY/qeXO; ptcz=b83981dabfae27bc81993fe3f0e2ceaf89dc14639d70aaacf83f6a3da5363d01; euin=oKSAoe4A7i6ion**; tmeLoginType=2; o_cookie=1720527130; pac_uid=1_2872023821; iip=0; ts_refer=ADTAGmyqq; psrf_qqunionid=; psrf_qqaccess_token=2107AC77A718330229335E0C11AC2163; psrf_qqrefresh_token=533A9E5F08FF1D72A67FD0A80DB6B492; psrf_qqopenid=8A8EF8D1F2D173E2E823DC0586282A37; yq_index=0; fqm_pvqid=1068a0f6-e572-4297-8603-62e7e9c07808; fqm_sessionid=ca832e93-a5ea-446e-a8a4-b58d3adaa1ab; pgv_info=ssid=s3814301731; ts_last=y.qq.com/; _qpsvr_localtk=0.2317493354585165; wxrefresh_token=; qm_keyst=Q_H_L_2iJ37260emGGotDA8OX7r90yZeOEaJ0hy4JAumYHgind-8vktF7UwUeD5lt2Yc0; qqmusic_key=Q_H_L_2iJ37260emGGotDA8OX7r90yZeOEaJ0hy4JAumYHgind-8vktF7UwUeD5lt2Yc0; wxunionid=; uin=1720527130; qm_keyst=Q_H_L_2iJ37260emGGotDA8OX7r90yZeOEaJ0hy4JAumYHgind-8vktF7UwUeD5lt2Yc0; wxopenid=; psrf_musickey_createtime=1619463483; psrf_access_token_expiresAt=1627239483'
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



