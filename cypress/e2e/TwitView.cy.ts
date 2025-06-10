import '../support/commands'

describe('template spec', () => {
  it('click on back button, should go back to twit list', () => {
    cy.visit('/')
    cy.get('#twit').click()
    cy.get('#btnTwitViewBack').click()
    cy.url().should('equal', 'http://localhost:5173/')
  })
  it('click on first twit and comment', () => {
    cy.visit('/')
    cy.get('#twit').click()
    cy.get('#btnMessageTwit').click()
    cy.get('#txtAreaAddCommentComponentPost').type('Ceci est un commentaire de test')
    cy.get('#btnAddCommentComponentSubmit').click()
  })
  it('click on first twit and like', () => {
    cy.visit('/')
    cy.get('#twit').click()
    cy.get('#btnLikeTwit').click()
  })
})
