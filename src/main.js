import Vue from 'vue';
import App from './App.vue';
import lsNav from '../dist/nav.js';
// import lsNav from './lib/index';

Vue.use(lsNav);

new Vue({
  el: '#app',
  render: h => h(App)
})
