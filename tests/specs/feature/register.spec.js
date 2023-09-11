describe('register', () => {
  const email = 'admin@mail.com'
  const password = 'password'
  const password_confirmation = password

  it('success register and redirect to /profile', () => {
    cy.RESET()
    cy.INTERCEPT(
      'POST',
      '/api/auth/register',
      {
        statusCode: 200,
        body: {access_token: 'access_token'}
      },
      'register'
    )
    cy.INTERCEPT(
      'GET',
      '/api/auth/user',
      {
        statusCode: 200,
        body: {email}
      }
    )
    cy.INTERCEPT(
      'POST',
      '/api/auth/refresh',
      {
        statusCode: 200,
        body: {access_token: 'access_token'}
      }
    )

    cy.visit('/')
    cy.contains('button', 'register').click()
    cy.contains('label[for="email"]', 'email')
    cy.contains('label[for="password"]', 'password')
    cy.contains('label[for="password_confirmation"]', 'password confirmation')

    cy.get('input[id="email"]')
      .should('have.attr', 'type', 'text')
      .type(email)
    cy.get('input[id="password"')
      .should('have.attr', 'type', 'password')
      .type(password)
    cy.get('input[id="password_confirmation"')
      .should('have.attr', 'type', 'password')
      .type(password_confirmation)
    cy.contains('button[data-cy="register-button"]', 'register')
      .click()

    cy.wait('@register')
      .should((xhr) => {
        expect(xhr.request.body).to.deep.equal({email, password, password_confirmation})
        expect(xhr.response.statusCode).to.be.equal(200)
        expect(xhr.response.body.access_token).to.exist.and.not.empty
        expect(localStorage.getItem('access_token')).to.be.equal(xhr.response.body.access_token)
      })
    cy.location('pathname').should('equal', '/profile')
  })
})
