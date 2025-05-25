describe('Flight Search Form', () => {
  const validOrigin = 'JFK'
  const validDestination = 'LHR'

  beforeEach(() => {
    cy.intercept('GET', '/api/airports', {
      fixture: 'airports.json',
    }).as('getAirports')
    cy.visit('/')
  })

  it('renders the form with inputs and a button', () => {
    cy.get('input[placeholder="From"]').should('exist')
    cy.get('input[placeholder="To"]').should('exist')
    cy.contains('button', 'Search flights').should('exist')
  })

  it('submits valid origin and destination', () => {
    cy.get('input[placeholder="From"]').type(validOrigin)
    cy.get('input[placeholder="To"]').type(validDestination)
    cy.contains('button', 'Search flights').click()

    cy.url().should('include', `/search?from=${validOrigin}&to=${validDestination}`)
  })

  it('shows error if origin and destination are the same', () => {
    cy.get('input[placeholder="From"]').type(validOrigin)
    cy.get('input[placeholder="To"]').type(validOrigin)
    cy.contains('button', 'Search flights').click()

    cy.contains('Origin and destination must differ').should('exist')
  })

  it('shows error for invalid airport codes', () => {
    cy.get('input[placeholder="From"]').type('XXX')
    cy.get('input[placeholder="To"]').type('YYY')
    cy.contains('button', 'Search flights').click()

    cy.contains('Invalid origin airport code').should('exist')
  })
})