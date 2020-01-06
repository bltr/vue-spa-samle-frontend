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
    cy.server()
    cy.route({
      method: 'GET',
      url: '/api/auth/user',
      response: {email}
    }).as('user')

    cy.visit('/profile')
    cy.wait('@user').then(xhr => {
      expect(xhr.responseBody).to.contain({email})
    })
    cy.contains(email)
  })
})
