describe('profile', () => {
  const email = 'admin@mail.com'

  it('redirect not authenticated user to /', () => {
    cy.visit('/profile')
    cy.location('pathname')
      .should('equal', '/')
  })

  it('it show user info', () => {
    cy.RESET()
    cy.LOGIN({email})
    cy.INTERCEPT(
      'GET',
      '/api/auth/user',
      {
        statusCode: 200,
        body: {email}
      },
      'user'
    )

    cy.visit('/profile')
    cy.wait('@user').then(xhr => {
      expect(xhr.response.body).to.contain({email})
    })
    cy.contains(email)
  })
})
