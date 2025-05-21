import '../support/commands'

describe('template spec', () => {
  it('click on for you button, must change content', () => {
    cy.visit('/')
    cy.get('#btnForYouContent').click()
    cy.url().should('equal', 'http://localhost:5173/')
  })
})
