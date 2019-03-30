import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

const getDefaultState = () => ({
  user: {
    role: 'Anonymous'
  }
})

export default new Vuex.Store({
  state: getDefaultState(),

  actions: {
    LOGOUT ({ commit }) {
      commit('RESET_USER')
      router.push('/login')
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
      return state.user.role === 'Admin'
    },

    isDoctor (state) {
      return state.user.role === 'Doctor'
    },

    isReceptionist (state) {
      return state.user.role === 'Receptionist'
    },

    isAnonymous (state) {
      return state.user.role === 'Anonymous'
    }
  }
})
