import {createRouter, createWebHistory} from 'vue-router'
import store from '@/js/store'
import Home from '@/components/HomeView'
import Profile from '@/components/profile/ProfileView'

const router = createRouter({
  linkExactActiveClass: 'disabled',
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/:pathMatch(.*)*',
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
