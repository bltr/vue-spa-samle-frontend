import store from "@/js/store"
import LoginForm from "@/components/auth/LoginForm.vue";

describe('LoginForm', () => {
  const loginButton = '[data-cy="login-button"]'
  const emailFeedback = '[data-cy="email-feedback"]'
  const emailInput = 'input[id="email"]'
  const pwInput = 'input[id="password"]'
  const pwFeedback = '[data-cy="password-feedback"]'
  const emailRequired = 'Email is required'
  const emailMustValid = 'Email must be valid'
  const pwRequired = 'Password is required'

  before(() => {
    cy.mount(LoginForm)
    cy.contains('label[for="email"]', 'email')
    cy.contains('label[for="password"]', 'password')
  })

  beforeEach(() => cy.mount(LoginForm))

  context('validation', () => {
    it('require email', () => {
      cy.get(loginButton).click()
      cy.contains(emailFeedback, emailRequired)
    })

    it('validate email on input', () => {
      cy.get(loginButton).click()
      cy.contains(emailFeedback, emailRequired)
      cy.get(emailInput).type('a')
      cy.get(emailFeedback).should('not.contain', emailRequired)
    })

    it('validate email on blur', () => {
      cy.get(emailInput).focus().blur()
      cy.contains(emailFeedback, emailRequired)
    })

    it('require valid email', () => {
      cy.get(emailInput).type('incorect-email')
      cy.contains(emailFeedback, emailMustValid)
      cy.get(emailInput).type('@mail.com')
      cy.get(emailFeedback).should('not.contain', emailMustValid)
    })

    it('require password', () => {
      cy.get(loginButton).click()
      cy.contains(pwFeedback, pwRequired)
    })

    it('validate password on input', () => {
      cy.get(loginButton).click()
      cy.contains(pwFeedback, pwRequired)
      cy.get(pwInput).type('a')
      cy.get(pwFeedback).should('not.contain', pwRequired)
    })

    it('validate password on blur', () => {
      cy.get(pwInput).focus().blur()
      cy.contains(pwFeedback, pwRequired)
    })
  })

  context('send form', () => {
    const access_token = 'access_token'
    const response = {access_token}

    function login() {
      cy.get(emailInput).type('admin@mail.com')
      cy.get(pwInput).type('password')
      cy.get(loginButton).click()
    }

    it('with correct credentials: set token in store', () => {
      cy.intercept(
        'POST',
        '/api/auth/login',
        {
          statusCode: 200,
          body: response
        }
      ).as('login')
      login()
      cy.wait('@login').then(() => {
        expect(store.state.auth.access_token).equal(access_token)
      })
    })

    it('with incorrect credentials: show alert', () => {
      cy.intercept(
        'POST',
        '/api/auth/login',
        {
          statusCode: 401,
          body: {}
        }
      ).as('login')
      login()
      cy.wait('@login')
      cy.contains('[data-cy="alert"]', 'These credentials do not match our records')
    })

    it('show alert when occurred internal api error', () => {
      cy.intercept(
        'POST',
        '/api/auth/login',
        {
          statusCode: 500,
          body: {}
        }
      ).as('login')
      login()
      cy.wait('@login')
      cy.contains('[data-cy="alert"]', 'Internal error')
    })

    it('disable login button and have spinner', () => {
      cy.intercept(
        'POST',
        '/api/auth/login',
        {
          statusCode: 200,
          body: response
        }
      ).as('login')
      login()
      cy.get(loginButton).should('have.attr', 'disabled')
      cy.get(loginButton + ' [data-cy="login-spinner"]')
    })

    it('enable login button and hide spinner when login failed', () => {
      cy.intercept(
        'POST',
        '/api/auth/login',
        {
          statusCode: 401,
          body: {}
        }
      ).as('login')
      login()
      cy.wait('@login')
      cy.get(loginButton).should('not.have.attr', 'disabled')
      cy.get(loginButton + ' [data-cy="login-spinner"]').should('not.exist')
    })
  })
})
