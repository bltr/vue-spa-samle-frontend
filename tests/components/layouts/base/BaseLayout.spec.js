import BaseLayout from "@/components/layouts/base/BaseLayout.vue"

describe('BaseLayout', () => {
  it('contains', () => {
    cy.mount(BaseLayout)
    cy.get('[data-cy="navbar"]')
  })
})
