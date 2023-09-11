// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'
import {mount} from 'cypress/vue2'
import Router from 'vue-router'
import Vuex from 'vuex'
import '@/scss'
import store from '@/js/store'
import router from '@/js/router'

Cypress.Commands.add('mount', (component, options = {}) => {
  options.extensions = options.extensions || {}
  options.extensions.plugins = options.extensions.plugins || []
  options.store = options.store || store
  options.extensions.plugins.push(Vuex)
  options.extensions.plugins.push(Router)
  options.router = router

  return mount(component, options)
})
