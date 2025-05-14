import '../support/commands'

describe('template spec', () => {
  it('click on message button, must change current url', () => {
    cy.visit('/')
    cy.get('#btnMessages').click()
    cy.url().should('include', '/messages')
  })
  it('click on explore button, must change current url', () => {
    cy.visit('/')
    cy.get('#btnExplore').click()
    cy.url().should('include', '/explore')
  })
  // it('click on profile button, must change current url', () => {
  //   cy.visit('/')
  //   cy.get('#btnProfile').click()
  //   cy.url().should('include', '/profile')
  // })
})
