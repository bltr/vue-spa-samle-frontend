describe('DashboardView', () => {

  it('contains h1', () => {
    cy.COMPONENT_LOAD('dashboard/DashboardView')
    cy.contains('h1', 'dashboard')
  })
})
