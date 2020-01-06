import '@/scss'
import Vue from 'vue'
import store from '@/js/store'
import router from './router'

Vue.mixin({
  methods: {
    reset() {
      if ('data' in this.$options) {
        Object.assign(this.$data, this.$options.data());
      }
      if ('created' in this.$options) {
        this.$options.created.forEach(hook => hook.apply(this))
      }
      this.$children.forEach(child => child.reset())
    }
  }
})

const app = new Vue({
  store,
  router,
  name: 'app',
  render: h => h('router-view'),
  el: '#app'
});

window.app = app
