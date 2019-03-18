import API from './backend'
import Vue from 'vue'

const ApiPlugin = {
  install (Vue) {
    Vue.prototype.$api = new API()
  }
}

Vue.use(ApiPlugin)
