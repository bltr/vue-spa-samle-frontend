import axios from 'axios'

function login(credentials) {
  return axios.post('/api/auth/login', credentials)
    .then(resp => resp.data.access_token)
    .catch(error => {
      if (error.response && error.response.status === 401) {
        throw new Error('These credentials do not match our records')
      }
      throw new Error('Internal error')
    })
}

function register(credentials) {
  return axios.post('/api/auth/register', credentials)
    .then(resp => resp.data.access_token)
    .catch(error => {
      if (error.response && error.response.status === 422) {
        throw new Error(error.response.data.errors.email)
      }
      throw new Error('Internal error')
    })
}

function logout() {
  return axios.post('/api/auth/logout')
}

function refresh() {
  return axios.post('/api/auth/refresh')
    .then(resp => resp.data.access_token)
}

function user() {
  return axios.get('/api/auth/user')
    .then(resp => resp.data)
}

const auth = {login, register, logout, refresh, user}

export default auth
