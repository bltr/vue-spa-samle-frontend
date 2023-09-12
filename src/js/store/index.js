import Vuex from 'vuex'
import auth from "./auth"

const store = new Vuex.Store({
  modules: {
    auth,
  }
})

export default store
