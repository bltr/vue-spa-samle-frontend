import Vue from 'vue'
import Router from 'vue-router'
import store from '@/js/store'
import Home from '@/components/HomeView'
import Profile from '@/components/profile/ProfileView'

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'disabled',
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '*',
      redirect: '/',
    },

    {
      path: '/profile',
      component: Profile,
      meta: {auth: true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth === true && !store.getters.isAuthenticated) {
    next('/')
    return
  }
  next()
})

export default router
