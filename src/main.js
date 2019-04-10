import Vue from 'vue'
import './plugins/vuetify'
import './plugins/api'
import App from './layout'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(Vuetify)
Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  router,
  components: { App },
  store,
  render: h => h(App)
}).$mount('#app')
