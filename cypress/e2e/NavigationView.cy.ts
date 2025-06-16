import '../support/commands'

describe('template spec', () => {
  it('click on home button, must change current url', () => {
    cy.visit('/messages')
    cy.get('#btnHome').click()
    cy.url().should('equal', 'http://localhost:5173/')
  })
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
  it('click on profile button, must change current url', () => {
    cy.visit('/')
    cy.get('#btnProfile').click()
    cy.url().should('include', '/@')
  })
  it('click on disconnect button, must change current url', () => {
    cy.visit('/')
    cy.get('#listItemUserManagement').click()
    cy.get('#itemDisconnectUser').click()
    cy.url().should('include', '/login')
  })
})
