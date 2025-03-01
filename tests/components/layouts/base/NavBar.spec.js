import Navbar from "@/components/layouts/base/Navbar.vue"

describe('NavBar', () => {
  beforeEach(() => cy.mount(Navbar))

  context('md', () => {
    beforeEach(() => cy.viewport(1024, 660))
    it('have visible navbar-collapse', () => {
      cy.get('[data-cy="navbar-collapse"]').should('be.visible')
    })

    it('have logout button', () => {
      cy.get('[data-cy="logout-button"]')
    })

    it('have nav-links', () => {
      cy.contains('a[href="/"]', 'dashboard')
      cy.contains('a[href="/profile"]', 'profile')
    })
  })

  context('sm', () => {
    beforeEach(() => cy.viewport(720, 660))

    it('have not visible navbar-collapse', () => {
      cy.get('[data-cy="navbar-collapse"]').should('not.be.visible')
    })

    it('have visible collapse toggler', () => {
      cy.get('[data-cy="toggler"]').should('be.visible')
    })

    it('toggle navbar-collapse', () => {
      cy.get('[data-cy="toggler"]').click()
      cy.get('[data-cy="navbar-collapse"]').should('be.visible')
      cy.get('[data-cy="toggler"]').click()
      cy.get('[data-cy="navbar-collapse"]').should('not.be.visible')
    })
  })
})
