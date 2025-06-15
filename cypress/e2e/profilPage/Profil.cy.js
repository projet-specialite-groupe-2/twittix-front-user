describe('Profil page tests', () => {
  it('Visit my own profile => Test email, name and bio', () => {
    cy.visit('/')

    cy.get('#list-item-profile').click({ force: true })

    cy.wait(5000) // Wait for images to load

    // Check name and identifier with the profil name and url query
    const userName = 'user'
    const bioText = 'bio de test'

    cy.url().should('include', '/@' + userName)
    cy.get('#profil-page-user-info h2').should('contain.text', userName)
    cy.get('#profil-page-user-info h4').should('contain.text', '@' + userName)
    cy.get('#profil-page-user-info div').first().should('contain.text', bioText)

    // Open the edit profile modal
    cy.get('#edit-profil-button').click({ force: true })

    // Check input values in the modal
    cy.get('#edit-profil-name').should('have.value', userName)
    cy.get('#edit-profil-bio').should('have.value', bioText)
  })
})
