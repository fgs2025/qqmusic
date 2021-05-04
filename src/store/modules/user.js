export default {
    namespaced: true,
    state: {
        userInfo: {}
    },
    mutations: {
        setUserInfo(state, val) {
            state.userInfo = val
        },
    },
    actions: {
        setUserInfo({ commit }, val) {
            commit('setUserInfo', val)
        }
    }
}