describe('Login page tests', () => {
  beforeEach(() => {
    cy.window().then(win => {
      win.localStorage.removeItem('token')
    })
  })

  it('Go to / without login => Go back to /login', () => {
    cy.visit('/')

    cy.url().should('include', '/login')
  })

  it('Try to login', () => {
    cy.visit('/login')

    // Click on the login button
    cy.get('#login-button').click({ force: true })

    // Next button should be disabled
    cy.get('#login-button-next').should('be.disabled')

    // Fill in the email => Next button should be enabled and click on it
    cy.get('#login-email-field').type('user@gmail.com')
    cy.get('#login-button-next').should('not.be.disabled')
    cy.get('#login-button-next').click({ force: true })

    // Next button should be disabled
    cy.get('#login-button-connect').should('be.disabled')

    // Fill in the password => Next button should be enabled and click on it
    cy.get('#login-password-field').type('password')
    cy.get('#login-button-connect').should('not.be.disabled')
  })

  it.only('Try to register', () => {
    cy.visit('/login')

    // Click on the login button
    cy.get('#register-button').click({ force: true })

    // Next button should be disabled
    cy.get('#register-button-next').should('be.disabled')

    // Fill in the username and email
    cy.get('#register-username-field').type('userTestRegister')
    cy.get('#register-email-field').type('userTestRegister@gmail.com')

    // Fill birthdate
    cy.get('#register-day-field').click({ force: true })
    cy.get('.v-list-item').contains('1').click()
    cy.get('#register-month-field').click({ force: true })
    cy.get('.v-list-item').contains('1').click()
    cy.get('#register-year-field').click({ force: true })
    cy.get('.v-list-item').contains('2025').click()

    // Error message should be displayed and Next button should be disabled
    cy.get('#register-error-message-birthdate').should('exist')
    cy.get('#register-button-next').should('be.disabled')

    // Update birthdate to a valid one
    cy.get('#register-year-field').click({ force: true })
    cy.get('.v-list-item').contains('2000').click()

    // Next button should be enabled and click on it
    cy.get('#register-button-next').should('not.be.disabled')
    cy.get('#register-button-next').click({ force: true })

    // Register button should be disabled
    cy.get('#register-button-create-account').should('be.disabled')

    // Fill in the password and wrong confirm password
    // => Error message should be displayed and Register button should be disabled
    cy.get('#register-password-field').type('password')
    cy.get('#register-confirm-password-field').type('wrongPassword')

    cy.get('#register-confirm-password-field-messages .v-messages__message').should('exist')
    cy.get('#register-button-create-account').should('be.disabled')

    // Fill in the confirm password and Register button should be enabled
    cy.get('#register-confirm-password-field').clear().type('password')
    cy.get('#register-button-create-account').should('not.be.disabled')
  })
})
