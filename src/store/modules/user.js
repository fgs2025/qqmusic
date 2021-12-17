export default {
  namespaced: true,
  state: {
    account: "",
    userInfo: {},
  },
  mutations: {
    setAccount(state, val) {
      state.account = val;
    },
    setUserInfo(state, val) {
      state.userInfo = val;
    },
  },
  actions: {
    setUserInfo({ commit }, val) {
      commit("setUserInfo", val);
    },
    setAccount({ commit }, val) {
      commit("setAccount", val);
    },
  },
};
