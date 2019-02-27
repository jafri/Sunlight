import Vue from 'vue'
import './plugins/vuetify'
import App from './layout'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  components: { App },
  store,
  render: h => h(App)
}).$mount('#app')
