describe('ProfileView', () => {
  const email = 'admin@mail.com'

  before(() => {
    cy.server()
    cy.route({
      url: '/api/auth/user',
      response: {email}
    }).as('user')
    cy.COMPONENT_LOAD('profile/ProfileView')
    cy.contains('h1', 'profile')
  })

  it('send request and display result', () => {
    cy.wait('@user')
    cy.contains('td', 'email')
    cy.contains('td', email)
  })

  it('emit "update:layout" with BaseLayout', () => {
    cy.COMPONENT().then(component => {
      return cy.stub(component, '$emit')
    }).then((emitStub) => {
      cy.COMPONENT_RESET()
      cy.wrap(emitStub).should('be.calledWithMatch', 'update:layout', {name: 'BaseLayout'})
    })
  })
})
