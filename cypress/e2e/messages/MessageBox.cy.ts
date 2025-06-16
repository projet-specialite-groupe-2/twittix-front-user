describe('MessageBox', () => {
  it('should display the message box', () => {
    cy.visit('http://localhost:5173/messages')
    cy.get('#messageBox').should('not.exist')
  })

  it('should display the message box on twit page', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#messageBox').should('exist')
  })

  it('click on message box should expand it', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#messageBox').click()
    cy.get('#messageBox').find('#conversationCard').should('exist')
  })

  it('try to delete a conversation', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#messageBox').click()
    cy.get('#messageBox')
      .find('#conversationCard')
      .trigger('mouseenter')
      .get('#conversationCardMenuButton')
      .click()
    cy.get('#deleteConversationButton').click()
  })

  it('click on conversation card should navigate to conversation page', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#messageBox').click()
    cy.get('#messageBox').find('#conversationCard').click()
    cy.url().should('match', /\/messages\/\d+/)
  })
})
