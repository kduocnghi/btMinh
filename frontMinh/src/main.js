import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import moment from 'moment'

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const socket = io('http://127.0.0.1:81');

Vue.use(VueSocketIOExt, socket);
import API from './config';
Vue.prototype.$apiURL = API.apiURL;
Vue.prototype.$moment = moment

import Axios from './axios';
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
