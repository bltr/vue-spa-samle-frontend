describe('logout', () => {
  it('logout and redirect to "/"', () => {
    cy.LOGIN()
    cy.server()
    cy.route({
      method: 'POST',
      url: '/api/auth/logout',
      response: {}
    }).as('logout')

    cy.visit('/')
    cy.contains('button[data-cy="logout-button"]', 'logout')
      .click()

    cy.wait('@logout')
      .then(() => {
        expect(localStorage.getItem('access_token')).be.equal(null)
      })
    cy.get('form[data-cy="login-form"]')
  })
})
