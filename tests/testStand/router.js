import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

let routes = []

let components = require.context('../../src/components/', true, /\.vue$/)
components.keys().forEach(key => {
  routes.push({
    path: '/test' + key.substr(1).replace('.vue', ''),
    component: components(key).default
  })
})

const router = new Router({
  linkExactActiveClass: 'disabled',
  mode: 'history',
  routes: routes
})

export default router
