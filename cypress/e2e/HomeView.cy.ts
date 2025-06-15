import '../support/commands'

describe('template spec', () => {
  it('click on for you button, must change content', () => {
    cy.visit('/')
    cy.get('#btnForYouContent').click()
    cy.url().should('equal', 'http://localhost:5173/')
  })
  it('click on followers button, must change content', () => {
    cy.visit('/')
    cy.get('#btnSubscriptionContent').click()
    cy.url().should('equal', 'http://localhost:5173/')
  })
  it('click on first twit', () => {
    cy.visit('/')
    cy.get('#twit').click()
    cy.url().should('contain', 'http://localhost:5173/twit/')
  })
  it('click on first twit and comment', () => {
    cy.visit('/')
    cy.get('#btnMessageTwit').click()
    cy.get('#txtAreaAddCommentComponentPost').type('Ceci est un commentaire de test')
    cy.get('#btnAddCommentComponentSubmit').click()
  })
  it('click on first twit and like', () => {
    cy.visit('/')
    cy.get('#btnLikeTwit').click()
  })
})
