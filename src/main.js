import Vue from 'vue'
import App from './App.vue'

// Vendor Styles
import 'vue-select/dist/vue-select.css';
import './assets/skeleton-tabs.css';
import 'skeleton-css/css/skeleton.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
