// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('CREATE', (model, amount, attributes) => {
  Cypress.log()

  if (Cypress.env('e2e')) {
    return cy.request({
      method: 'POST',
      url: '/api/__cypress/create',
      headers: {Accept: 'application/json'},
      body: {model, amount, attributes},
      log: false
    })
      .its('body', {log: false})
  } else {
    return attributes
  }
})

Cypress.Commands.add('RESET', () => {
  Cypress.log()

  if (Cypress.env('e2e')) {
    cy.request({
      method: 'POST',
      url: '/api/__cypress/reset',
      headers: {Accept: 'application/json'},
      log: false
    })
  }
})

Cypress.Commands.add('LOGIN', (attributes) => {
  Cypress.log()

  if (Cypress.env('e2e')) {
    return cy.request({
      method: 'POST',
      url: '/api/__cypress/login',
      headers: {Accept: 'application/json'},
      body: {attributes},
      log: false
    })
      .then(({body}) => {
        localStorage.setItem('access_token', body.access_token)
        return body.user
      })
  } else {
    localStorage.setItem('access_token', 'access_token')
    return attributes
  }
})

Cypress.Commands.add('INTERCEPT', (method, url, request, alias) => {
  let i;
  if (Cypress.env('e2e')) {
    i = cy.intercept(
      method,
      url
    )
  } else {
    i = cy.intercept(
      method,
      url,
      request
    )
  }

  if (alias) {
    i.as(alias)
  }
})
