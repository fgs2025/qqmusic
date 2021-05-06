import { instance } from "@/utils/request";

export const setCookie = function () {
    return instance({
        url: '/user/setCookie',//登陆
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            data: 'ts_refer=ADTAGmyqq; pgv_pvid=7537791371; ts_uid=7607999063; ptui_loginuin=1720527130; RK=Q9itY/quTM; ptcz=26083d368328436fe718fe84c579f0ffe32b405866a41ffaa536670c28d5e8a2; tmeLoginType=2; euin=oKSAoe4A7i6ion**; pgv_info=ssid=s4603029088; yqq_stat=0; yplayer_open=1; yq_playschange=0; yq_playdata=; player_exist=1; qqmusic_fromtag=66; yq_index=0; userAction=1; ts_last=y.qq.com/; _qpsvr_localtk=0.8551016490599503; psrf_access_token_expiresAt=1628090349; wxrefresh_token=; qqmusic_key=Q_H_L_2qE2K260eCAXrG8Wo7zaGz5hNsqO6VUmB3mUVGKleGfO8PUkAavCRThMUaevgSC; psrf_musickey_createtime=1620314349; qm_keyst=Q_H_L_2qE2K260eCAXrG8Wo7zaGz5hNsqO6VUmB3mUVGKleGfO8PUkAavCRThMUaevgSC; psrf_qqrefresh_token=533A9E5F08FF1D72A67FD0A80DB6B492; psrf_qqopenid=8A8EF8D1F2D173E2E823DC0586282A37; wxunionid=; wxopenid=; qm_keyst=Q_H_L_2qE2K260eCAXrG8Wo7zaGz5hNsqO6VUmB3mUVGKleGfO8PUkAavCRThMUaevgSC; psrf_qqaccess_token=2107AC77A718330229335E0C11AC2163; psrf_qqunionid=; uin=1720527130'
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



