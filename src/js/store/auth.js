import api from "@/js/api"
import router from "@/js/router"

const TOKEN_KEY = 'access_token'

const defaultState = () => {
  return {
    access_token: localStorage.getItem(TOKEN_KEY) || null,
    user: {}
  }
}

const state = defaultState()

const getters = {
  isAuthenticated: state => !!state.access_token
}

const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },

  login(state, access_token) {
    state.access_token = access_token
    localStorage.setItem(TOKEN_KEY, access_token)
  },

  logout(state) {
    state.access_token = null
    localStorage.removeItem(TOKEN_KEY)
  },

  user(state, user) {
    state.user = user
  }
}

const actions = {
  login({commit}, credentials) {
    return api.auth.login(credentials)
      .then((access_token) => {
        commit('login', access_token)
      })
  },

  register({commit}, credentials) {
    return api.auth.register(credentials)
      .then((access_token) => {
        commit('login', access_token)
      })
  },

  logout({commit}) {
    return api.auth.logout()
      .finally(() => commit('logout'))
  },

  refresh({commit}) {
    return api.auth.refresh()
      .then(token => commit('login', token))
      .catch((error) => {
        commit('logout')
        router.push('/')
        return Promise.reject(error)
      })
  },

  user({commit}) {
    return api.auth.user()
      .then(user => {
        commit('user', user)
        return user
      })
  }
}

export default {state, getters, mutations, actions}
