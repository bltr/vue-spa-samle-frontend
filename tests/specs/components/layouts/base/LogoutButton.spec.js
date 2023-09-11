describe('LogoutButton', () => {
  beforeEach(() => {
    cy.COMPONENT_LOAD('layouts/base/LogoutButton')
    cy.contains('button', 'logout')

    cy.STORE_LOGIN()
    cy.intercept(
      'POST',
      '/api/auth/logout',
      {
        statusCode: 200,
        body: {}
      }
    ).as('logout')
    cy.COMPONENT().then(component => {
      // let routerReplaceStub = cy.stub(component.$router, 'replace')
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
      cy.STORE().its('auth.access_token').should('be.null')
    })
  })
})
