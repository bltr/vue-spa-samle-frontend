describe('logout', () => {
  it('logout and redirect to "/"', () => {
    cy.LOGIN()
    cy.INTERCEPT(
      'POST',
      '/api/auth/logout',
      {
        statusCode: 200,
        body: {}
      },
      'logout'
    )

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
