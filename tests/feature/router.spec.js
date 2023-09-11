describe('router', () => {
  it('redirect from nonexistent routes to home page', () => {
    cy.visit('/nonexistent-route')
    cy.location('pathname').should('equal', '/')
  })
})
