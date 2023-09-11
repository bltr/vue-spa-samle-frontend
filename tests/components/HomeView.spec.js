import store from '@/js/store'
import HomeView from "@/components/HomeView.vue"

describe('HomeView', () => {
  beforeEach(() => cy.mount(HomeView))

  // context('when created', () => {
  //   it('emit "update:layout" with div if not authenticated', () => {
  //     cy.STORE_LOGOUT()
  //     cy.COMPONENT().then(component => {
  //       return cy.stub(component, '$emit')
  //     }).then((emitStub) => {
  //       cy.COMPONENT_LOAD()
  //       cy.wrap(emitStub).should('be.calledWithMatch', 'update:layout', 'div')
  //     })
  //   })
  //
  //   it('emit "update:layout" with BaseLayout if authenticated', () => {
  //     cy.STORE_LOGIN()
  //     cy.COMPONENT().then(component => {
  //       return cy.stub(component, '$emit')
  //     }).then((emitStub) => {
  //       cy.COMPONENT_LOAD()
  //       cy.wrap(emitStub).should('be.calledWithMatch', 'update:layout', {name: 'BaseLayout'})
  //     })
  //   })
  // })
  //
  // context('when store change state', () => {
  //   it('to authenticated: emit "update:layout" with BaseLayout', () => {
  //     cy.STORE_LOGOUT()
  //     cy.COMPONENT().then(component => {
  //       return cy.stub(component, '$emit')
  //     }).then((emitStub) => {
  //       cy.STORE_LOGIN()
  //       cy.wrap(emitStub).should('be.calledWithMatch', 'update:layout', {name: 'BaseLayout'})
  //     })
  //   })
  //
  //   it('to not authenticated: emit "update:layout" with div', () => {
  //     cy.STORE_LOGIN()
  //     cy.COMPONENT().then(component => {
  //       return cy.stub(component, '$emit')
  //     }).then((emitStub) => {
  //       cy.STORE_LOGOUT()
  //       cy.wrap(emitStub).should('be.calledWithMatch', 'update:layout', 'div')
  //     })
  //   })
  // })

  context('show', () => {
    it('AuthView when not authenticated', () => {
      store.commit('logout')
      cy.get('[data-cy="auth-view"]')
    })

    it('DashboardView when authenticated', () => {
      store.commit('login', 'access_token')
      cy.get('[data-cy="dashboard-view"]')
    })
  })
})
