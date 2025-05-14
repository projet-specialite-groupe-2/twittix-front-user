/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      setFakeToken(): Chainable<void>
    }
  }
}

import { faker } from '@faker-js/faker'

Cypress.Commands.add('setFakeToken', () => {
  const fakeToken = faker.string.uuid()
  cy.window().then(win => {
    win.localStorage.setItem('auth_token', fakeToken)
  })
})

// Ce code s'exécute avant tous les tests
before(() => {
  cy.visit('/') // charge la page pour accéder au window/localStorage
  cy.setFakeToken()
})
