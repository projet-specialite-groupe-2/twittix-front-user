// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import { faker } from '@faker-js/faker'

Cypress.Commands.add('setFakeToken', () => {
  const fakeToken = faker.internet.jwt({
    payload: {
      sub: faker.string.uuid(),
      exp: 999999999999,
      email: faker.internet.email(),
      pwd: faker.internet.password(),
      type: 'access',
    },
  })
  cy.window().then(win => {
    win.localStorage.setItem('token', fakeToken)
  })
})

// Ce code s'exécute avant tous les tests
before(() => {
  cy.visit('/') // charge la page pour accéder au window/localStorage
  cy.setFakeToken()
})
