import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userAvatar: null,
    identity: 0,
  },
  getters: {
  },
  mutations: {
    setLoginState(state, status) {
      state.isLogin = status
    },

    setIdentity(state, status) {
      state.identity = status
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
