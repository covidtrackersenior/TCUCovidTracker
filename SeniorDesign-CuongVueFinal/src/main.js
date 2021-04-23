/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import { Icon } from 'leaflet';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './plugins/vue2-filters';
import './plugins/vue2-perfect-scrollbar';
import 'leaflet/dist/leaflet.css';
import store from './store';

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
