import { instance } from "@/utils/request";

export const setCookie = function () {
    return instance({
        url: '/user/setCookie',//登陆
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            data: 'ts_refer=ADTAGmyqq; pgv_pvid=6417364054; ts_uid=3993945995; ptui_loginuin=1720527130; RK=V1ilJ/qOQs; ptcz=68ae3c543e7084e7f99365fc1007f68c67872dbc5f9eab6e829f250c15f73f1f; euin=oKSAoe4A7i6ion**; tmeLoginType=2; userAction=1; yq_index=0; yqq_stat=0; pgv_info=ssid=s8254187782; ts_last=y.qq.com/; _qpsvr_localtk=0.8215033155018605; qm_keyst=Q_H_L_28NVI260eOf5tZ6AkpBOuzehjkyuuuX4Yg7lqLGVN__P698YlGxkh8OetvJp__8; uin=1720527130; psrf_access_token_expiresAt=1627989106; psrf_qqopenid=8A8EF8D1F2D173E2E823DC0586282A37; wxunionid=; psrf_qqaccess_token=2107AC77A718330229335E0C11AC2163; psrf_qqunionid=; qm_keyst=Q_H_L_28NVI260eOf5tZ6AkpBOuzehjkyuuuX4Yg7lqLGVN__P698YlGxkh8OetvJp__8; psrf_qqrefresh_token=533A9E5F08FF1D72A67FD0A80DB6B492; psrf_musickey_createtime=1620213106; qqmusic_key=Q_H_L_28NVI260eOf5tZ6AkpBOuzehjkyuuuX4Yg7lqLGVN__P698YlGxkh8OetvJp__8; wxrefresh_token=; wxopenid='
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



