import '@/scss'
import Vue from 'vue'
import router from "@/js/router"
import store from "@/js/store";
import App from "@/components/App";

const app = new Vue({
  router,
  store,
  name: 'app',
  render: h => h(App),
  el: '#app'
});
