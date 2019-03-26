import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

const getDefaultState = () => ({
  user: {
    role: 'anonymous'
  }
})

export default new Vuex.Store({
  state: getDefaultState(),

  actions: {
    LOGOUT ({ commit }) {
      commit('RESET_USER')
      router.push('/')
    }
  },

  mutations: {
    SET_USER (state, user) {
      state.user = user
    },

    RESET_USER (state) {
      Object.assign(state, getDefaultState())
    }
  },

  getters: {
    isAdmin (state) {
      return state.user.role === 'admin'
    },

    isDoctor (state) {
      return state.user.role === 'doctor'
    },

    isReceptionist (state) {
      return state.user.role === 'receptionist'
    },

    isAnonymous (state) {
      return state.user.role === 'anonymous'
    }
  }
})
