import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      role: 'anonymous'
    }
  },

  actions: {

  },

  mutations: {
    SET_USER (state, user) {
      state.user = user
    }
  },

  getters: {
    isAdmin (state) {
      return state.user.role === 'admin'
    },

    isDoctor (state) {
      return state.user.role === 'doctor'
    },

    isAnonymous (state) {
      return state.user.role === 'anonymous'
    }
  }
})
