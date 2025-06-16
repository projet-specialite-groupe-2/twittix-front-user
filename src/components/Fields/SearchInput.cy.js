import SearchInput from './SearchInput.vue'

describe('<SearchInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(SearchInput)
  })
})