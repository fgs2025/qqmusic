import { instance } from "@/utils/request";

export const setCookie = function () {
    return instance({
        url: '/user/setCookie',//登陆
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            data: 'pgv_pvid=3099377216; fqm_pvqid=4a4744f0-1c66-46b6-be0b-b77f8bc120da; fqm_sessionid=8d78a78e-4831-4e79-a102-b30f4536f64a; pgv_info=ssid=s3320629271; ts_last=y.qq.com/; ts_refer=ADTAGmyqq; ts_uid=9352185040; _qpsvr_localtk=0.4893821669469878; ptui_loginuin=1720527130; RK=N0jlc/qvRM; ptcz=a1b85bbb7e787bb785f689e7413d953bb12c6af4d11d45ea56d52de2a38fba3b; login_type=1; euin=oKSAoe4A7i6ion**; uin=1720527130; psrf_qqopenid=8A8EF8D1F2D173E2E823DC0586282A37; qqmusic_key=Q_H_L_2uJuz260eqHtn87f1H3Z7o0xH1JbvyfePCDEIvb3EiNrC_Zz3qnC989tLumPrn7; psrf_qqaccess_token=2107AC77A718330229335E0C11AC2163; psrf_qqrefresh_token=533A9E5F08FF1D72A67FD0A80DB6B492; qm_keyst=Q_H_L_2uJuz260eqHtn87f1H3Z7o0xH1JbvyfePCDEIvb3EiNrC_Zz3qnC989tLumPrn7; wxunionid=; psrf_qqunionid=; wxrefresh_token=; tmeLoginType=2; psrf_musickey_createtime=1623056702; psrf_access_token_expiresAt=1630832702; wxopenid=; qm_keyst=Q_H_L_2uJuz260eqHtn87f1H3Z7o0xH1JbvyfePCDEIvb3EiNrC_Zz3qnC989tLumPrn7'
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



