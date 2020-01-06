describe('LogoutButton', () => {
  before(() => {
    cy.COMPONENT_LOAD('layouts/base/LogoutButton')
    cy.contains('button', 'logout')
  })

  let routerReplaceStub
  beforeEach(() => {
    cy.STORE_LOGIN()
    cy.server()
    cy.route({method: 'POST', url: '/api/auth/logout', response: {}}).as('logout')
    cy.COMPONENT().then(component => {
      routerReplaceStub = cy.stub(component.$router, 'replace')
    })
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
      cy.STORE().its('auth.access_token').should('equal', null)
    })
  })
})
