import { instance } from "@/utils/request";

export const setCookie = function () {
    return instance({
        url: '/user/setCookie',//登陆
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            data: 'pgv_pvid=5663537920; ts_uid=3400591506; ptui_loginuin=1720527130; RK=C9itY/qeXO; ptcz=b83981dabfae27bc81993fe3f0e2ceaf89dc14639d70aaacf83f6a3da5363d01; euin=oKSAoe4A7i6ion**; tmeLoginType=2; o_cookie=1720527130; pac_uid=1_2872023821; iip=0; ts_refer=ADTAGmyqq; userAction=1; yqq_stat=0; ts_last=y.qq.com/; pgv_info=ssid=s7670825368; _qpsvr_localtk=0.27191784175276035; psrf_qqopenid=8A8EF8D1F2D173E2E823DC0586282A37; psrf_qqrefresh_token=533A9E5F08FF1D72A67FD0A80DB6B492; qm_keyst=Q_H_L_2ytJ0260eiqNxeXI5kW7Xt8Kb4Td5fR3fEW9WNkG5txbn1PBpQUB5zku4NoXBM4; psrf_qqaccess_token=2107AC77A718330229335E0C11AC2163; qqmusic_key=Q_H_L_2ytJ0260eiqNxeXI5kW7Xt8Kb4Td5fR3fEW9WNkG5txbn1PBpQUB5zku4NoXBM4; psrf_qqunionid=; psrf_access_token_expiresAt=1626797695; uin=1720527130; psrf_musickey_createtime=1619021695'
        }
    })
};

export const getCookie = function () {
    return instance({
        url: '/user/getCookie',//查看当前Cookie
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