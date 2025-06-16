import '../../support/commands'

describe('Messages', () => {
  it('Create a conversation', () => {
    cy.visit('http://localhost:5173/messages')

    cy.get('#btnNewMessageDialog').click()

    cy.get('#userCard').click()

    cy.get('#btnNewMessageDialogNext').click()

    cy.url().should('match', /\/messages\/\d+/)
  })

  it('Click on a conversation and send a message', () => {
    cy.visit('http://localhost:5173/messages')

    cy.get('#conversationCard').click()

    cy.get('#txtAreaAddCommentComponentPost').type('Test message{enter}', {
      force: true,
    })

    cy.get('#txtAreaAddCommentComponentPost').should('have.value', '')
  })

  it('Delete a conversation', () => {
    cy.visit('http://localhost:5173/messages')

    cy.get('#conversationCard').trigger('mouseenter').get('#conversationCardMenuButton').click()

    cy.get('#deleteConversationButton').click()
  })
})
