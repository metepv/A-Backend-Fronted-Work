// main.js
import Vue from 'vue'; // Assuming Vue is installed as a package
import App from './App_vue.vue'; 
import router from './index.js'; // Assuming index.js is in the same directory as your JavaScript file

Vue.config.productionTip = false;

new Vue({
  router,
  render: function (h) {
    return h(App);
  }
}).$mount('#app');
