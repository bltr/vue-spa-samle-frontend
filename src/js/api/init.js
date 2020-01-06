import axios from 'axios'
import store from '@/js/store'

axios.interceptors.request.use(config => {
  let access_token = store.state.auth.access_token
  if (access_token) {
    config.headers['Authorization'] = 'Bearer ' + access_token
    return config
  }

  delete config.headers['Authorizations']
  return config
})


axios.interceptors.response.use(null, error => {
  if (
    !error.response ||
    error.response.status !== 401 ||
    error.config.url === '/api/auth/refresh' ||
    error.config.url === '/api/auth/login'
  ) {
    return Promise.reject(error)
  }

  error.config.baseURL = '/'
  return store.dispatch('refresh')
    .then(() => axios(error.config))
})
