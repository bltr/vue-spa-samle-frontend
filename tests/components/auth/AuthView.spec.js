import AuthView from "@/components/auth/AuthView.vue"

describe('AuthView', () => {
  before(() => {
    cy.mount(AuthView)
    cy.contains('h1', 'DenegUchet')
    cy.contains('p', 'personal finance accounting service')
    cy.contains('button', 'login').should('have.attr', 'disabled')
    cy.contains('button', 'register').should('not.have.attr', 'disabled')
    cy.get('form[data-cy="login-form"]')
  })

  beforeEach(() => cy.mount(AuthView))
  it(`display register form when click on "register"`, () => {
    cy.contains('button', 'register').click()
    cy.get('form[data-cy="register-form"]')
    cy.contains('button', 'login').should('not.have.attr', 'disabled')
    cy.contains('button', 'register').should('have.attr', 'disabled')
  })

  it('display login form when click on "login"', () => {
    cy.contains('button', 'register').click()

    cy.contains('button', 'login').click()
    cy.get('form[data-cy="login-form"]')
    cy.contains('button', 'login').should('have.attr', 'disabled')
    cy.contains('button', 'register').should('not.have.attr', 'disabled')
  })
})
