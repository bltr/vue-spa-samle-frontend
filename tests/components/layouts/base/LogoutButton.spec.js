import store from '@/js/store'
import LogoutButton from "@/components/layouts/base/LogoutButton.vue"

describe('LogoutButton', () => {
  beforeEach(() => {
    cy.mount(LogoutButton)
    cy.contains('button', 'logout')

    store.commit('login', 'access_token')
    cy.intercept(
      'POST',
      '/api/auth/logout',
      {
        statusCode: 200,
        body: {}
      }
    ).as('logout')
    // let routerReplaceStub = cy.stub(component.$router, 'replace')
  })

  it('send logout request', () => {
    cy.get('button').click()
    cy.wait('@logout')
  })

  it('clear localStorage', () => {
    cy.get('button').click()
    cy.wait('@logout').then((xhr) => {
      expect(localStorage.getItem('access_token')).be.null
    })
  })

  it('reset store state', () => {
    cy.get('button').click()
    cy.wait('@logout').then(() => {
      expect(store.state.auth.access_token).equal(null)
    })
  })
})
