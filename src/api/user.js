import { instance } from "@/utils/request";

export const setCookie = function () {
    return instance({
        url: '/user/setCookie',//登陆
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            data: 'pgv_pvid=2778390947; fqm_pvqid=7a47f4be-9d81-40bf-9569-ac602b560a04; ts_uid=5218279040; pgv_info=ssid=s3314723407; ts_refer=ADTAGmyqq; qqmusic_fromtag=66; player_exist=1; yq_playschange=0; yq_playdata=; yq_index=0; yplayer_open=0; yqq_stat=0; ts_last=y.qq.com/; userAction=1; _qpsvr_localtk=0.8505290748740422; ptui_loginuin=1720527130; RK=y1ilZ9q+Rs; ptcz=7d651cb9c5bcba8bebc38326e6d51e12af3a3a1d001c27b0646589d4cf0281b7; login_type=1; psrf_musickey_createtime=1620573388; euin=oKSAoe4A7i6ion**; qm_keyst=Q_H_L_2mC-N260e0Bhp3J1IYofWHkJaz_7HKSm8YD2gr013bTHS7FfUv9UKYfcKnS6ghD; wxopenid=; psrf_qqaccess_token=2107AC77A718330229335E0C11AC2163; tmeLoginType=2; qqmusic_key=Q_H_L_2mC-N260e0Bhp3J1IYofWHkJaz_7HKSm8YD2gr013bTHS7FfUv9UKYfcKnS6ghD; psrf_qqopenid=8A8EF8D1F2D173E2E823DC0586282A37; qm_keyst=Q_H_L_2mC-N260e0Bhp3J1IYofWHkJaz_7HKSm8YD2gr013bTHS7FfUv9UKYfcKnS6ghD; psrf_access_token_expiresAt=1628349388; uin=1720527130; wxrefresh_token=; psrf_qqunionid=; wxunionid=; psrf_qqrefresh_token=533A9E5F08FF1D72A67FD0A80DB6B492'
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



