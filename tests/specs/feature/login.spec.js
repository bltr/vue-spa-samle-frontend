describe('login', () => {
  const email = 'admin@mail.com'
  const password = 'password'

  it('success login and show dashboard', () => {
    cy.RESET()
    cy.CREATE('user', 1, {email: email})
    cy.server()
    cy.route({
      method: 'POST',
      url: '/api/auth/login',
      status: 200,
      response: {access_token: 'access_token'}
    }).as('login')

    cy.visit('/')
    cy.contains('label[for="email"]', 'email')
    cy.contains('label[for="password"]', 'password')

    cy.get('input[id="email"]')
      .should('to.have.attr', 'type', 'text')
      .type(email)
    cy.get('input[id="password"]')
      .should('to.have.attr', 'type', 'password')
      .type(password)
    cy.contains('button[data-cy="login-button"]', 'login')
      .click()

    cy.wait('@login')
      .should(xhr => {
        expect(xhr.request.body).to.deep.equal({email, password})
        expect(xhr.status).to.equal(200)
        expect(xhr.response.body.access_token).to.exist.and.not.empty
        expect(localStorage.getItem('access_token')).to.be.equal(xhr.response.body.access_token)
      })
    cy.location('pathname').should('equal', '/')
    cy.contains('div[data-cy="dashboard-view"]', 'dashboard')
  })
})
