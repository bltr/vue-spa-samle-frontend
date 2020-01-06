describe('BaseLayout', () => {
  it('contains', () => {
    cy.COMPONENT_LOAD('layouts/base/BaseLayout')
    cy.get('[data-cy="navbar"]')
  })
})
