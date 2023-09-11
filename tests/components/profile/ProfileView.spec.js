import ProfileView from "@/components/profile/ProfileView.vue"

describe('ProfileView', () => {
  const email = 'admin@mail.com'

  beforeEach(() => {
    cy.intercept(
      'GET',
      '/api/auth/user',
      {
        statusCode: 200,
        body: {email}
      }
    ).as('user')
    cy.mount(ProfileView)
    cy.contains('h1', 'profile')
  })

  it('send request and display result', () => {
    cy.wait('@user')
    cy.contains('td', 'email')
    cy.contains('td', email)
  })

  // it('emit "update:layout" with BaseLayout', () => {
  //   cy.COMPONENT().then(component => {
  //     return cy.stub(component, '$emit')
  //   }).then((emitStub) => {
  //     cy.wrap(emitStub).should('be.calledWithMatch', 'update:layout', {name: 'BaseLayout'})
  //   })
  // })
})
