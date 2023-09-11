import DashboardView from "@/components/dashboard/DashboardView.vue"

describe('DashboardView', () => {

  it('contains h1', () => {
    cy.mount(DashboardView)
    cy.contains('h1', 'dashboard')
  })
})
