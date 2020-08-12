import Vue from 'vue'
import App from './App.vue'
import $ from 'jquery'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

// Register it globally
// main.js or any entry file.

import 'bootstrap' // Import js file
import 'bootstrap/dist/css/bootstrap.min.css' // Import css file
import 'font-awesome/css/font-awesome.css'
import 'vue-loading-overlay/dist/vue-loading.css'

import '@/assets/css/index.css'

Vue.config.productionTip = false
Vue.prototype.$ = $

Vue.use(VueAxios, axios)
Vue.use(Loading, {
  canCancel: false,
  color: '#D6C385',
  loader: 'dots',
  width: 50,
  height: 50,
  backgroundColor: '#ffffff',
  isFullPage: true,
  opacity: 0.8
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
