import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// identity： 0：用户、1：管理员、2：前台人员、3：保洁人员、4：仓库管理员
export default new Vuex.Store({
  state: {
    userAvatar: null,
    identity: 1,
    isLogin: false,
  },
  getters: {
  },
  mutations: {
    setIdentity(state, status) {
      state.identity = status
    },

    setLoginState(state, status) {
      state.isLogin = status
    },

    setUserAvatar(state, status) {
      state.userAvatar = status
    }
  },
  actions: {
  },
  modules: {
  }
})
