import '@/scss'
import Vue from 'vue'
import store from '@/js/store'
import router from './router'

var app = new Vue({
  store,
  router,
  name: 'app',
  render: h => h('router-view'),
  el: '#app'
});

window.top.app = app
