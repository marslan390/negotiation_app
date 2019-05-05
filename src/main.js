import Vue from 'vue'
import App from './App.vue'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import './app.scss'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
