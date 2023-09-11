import store from "@/js/store"
import router from '@/js/router'
import RegisterForm from "@/components/auth/RegisterForm.vue"

describe('RegisterForm', () => {
  const registerButton = '[data-cy="register-button"]'
  const emailFeedback = '[data-cy="email-feedback"]'
  const emailInput = 'input[id="email"]'
  const pwInput = 'input[id="password"]'
  const pwFeedback = '[data-cy="password-feedback"]'
  const pwcInput = 'input[id="password_confirmation"]'
  const pwcFeedback = '[data-cy="password_confirmation-feedback"]'
  const emailRequired = 'Email is required'
  const emailMustValid = 'Email must be valid'
  const pwRequired = 'Password is required'
  const pwMust8 = 'Password must be more than 8'
  const pwcMustConfirmed = 'Password must be confirmed'
  const pwcNotMatch = 'Password confirmation does not match'

  before(() => {
    cy.mount(RegisterForm)
    cy.contains('label[for="email"]', 'email')
    cy.contains('label[for="password"]', 'password')
    cy.contains('label[for="password_confirmation"]', 'password confirmation')
  })

  let routerPushStub

  beforeEach(() => {
    cy.mount(RegisterForm)
    routerPushStub = cy.stub(router, 'push')
  })

  context('validation', () => {
    it('require email', () => {
      cy.get(registerButton).click()
      cy.contains(emailFeedback, emailRequired)
    })

    it('validate email on input', () => {
      cy.get(registerButton).click()
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
      cy.get(registerButton).click()
      cy.contains(pwFeedback, pwRequired)
    })

    it('validate password on input', () => {
      cy.get(registerButton).click()
      cy.contains(pwFeedback, pwRequired)
      cy.get(pwInput).type('a')
      cy.get(pwFeedback).should('not.contain', pwRequired)
    })

    it('validate password on blur', () => {
      cy.get(pwInput).focus().blur()
      cy.contains(pwFeedback, pwRequired)
    })

    it('require password more than 8', () => {
      cy.get(pwInput).type('1234567')
      cy.contains(pwFeedback, pwMust8)
      cy.get(pwInput).type('8')
      cy.get(pwFeedback).should('not.contain', pwMust8)
    })

    it('require password cofirmation', () => {
      cy.get(registerButton).click()
      cy.contains(pwcFeedback, pwcMustConfirmed)
    })

    it('validate password confirmation on input', () => {
      cy.get(registerButton).click()
      cy.contains(pwcFeedback, pwcMustConfirmed)
      cy.get(pwcInput).type('a')
      cy.get(pwcFeedback).should('not.contain', pwcMustConfirmed)
    })

    it('validate password confirmation on blur', () => {
      cy.get(pwcInput).focus().blur()
      cy.contains(pwcFeedback, pwcMustConfirmed)
    })

    it('require password confirmation matched to password', () => {
      cy.get(pwInput).type('password')
      cy.get(pwcInput).type('passwor')
      cy.contains(pwcFeedback, pwcNotMatch)
      cy.get(pwInput).type('d')
      cy.get(pwFeedback).should('not.contain', pwcMustConfirmed)
    })
  })

  context('send form', () => {
    const access_token = 'access_token'
    const response = {access_token}

    function register() {
      cy.get(emailInput).type('admin@mail.com')
      cy.get(pwInput).type('password')
      cy.get(pwcInput).type('password')
      cy.get(registerButton).click()
    }

    it('with correct data: set token in store', () => {
      cy.intercept(
        'POST',
        '/api/auth/register',
        {
          statusCode: 200,
          body: response
        }
      ).as('register')
      register()
      cy.wait('@register').then(() => {
        expect(store.state.auth.access_token).equal(access_token)
      })
    })

    it('with correct data: navigate to "/profile"', () => {
      cy.intercept(
        'POST',
        '/api/auth/register',
        {
          statusCode: 200,
          body: response
        }
      ).as('register')
      register()
      cy.wait('@register').then(() => {
        expect(routerPushStub).to.calledWith('/profile')
      })
    })

    it('with exist email: show alert', () => {
      cy.intercept(
        'POST',
        '/api/auth/register',
        {
          statusCode: 422,
          body: {errors: {email: 'These email already taken'}}
        }
      ).as('register')
      register()
      cy.wait('@register')
      cy.contains('[data-cy="register-alert"]', 'These email already taken')
    })

    it('show alert when occurred internal api error', () => {
      cy.intercept(
        'POST',
        '/api/auth/register',
        {
          statusCode: 500,
          body: {}
        }
      ).as('register')
      register()
      cy.wait('@register')
      cy.contains('[data-cy="register-alert"]', 'Internal error')
    })

    it('disable register button and have spinner', () => {
      cy.intercept(
        'POST',
        '/api/auth/register',
        {
          statusCode: 200,
          body: response
        }
      ).as('register')
      register()
      cy.get(registerButton).should('have.attr', 'disabled')
      cy.get(registerButton + ' [data-cy="register-spinner"]')
    })

    it('enable register button and hide spinner when login failed', () => {
      cy.intercept(
        'POST',
        '/api/auth/register',
        {
          statusCode: 401,
          body: {}
        }
      ).as('register')
      register()
      cy.wait('@register')
      cy.get(registerButton).should('not.have.attr', 'disabled')
      cy.get(registerButton + ' [data-cy="login-spinner"]').should('not.exist')
    })
  })
})
