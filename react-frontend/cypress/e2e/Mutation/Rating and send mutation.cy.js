/// <reference types="cypress" />

describe('Spotify explorer, rate song test', () => {
    beforeEach(() => {
      // Visit page before each test
      cy.visit('http://localhost:3000/')
    })
  
   it('Rate song flow and sends a request', () => {
    // Expand song
    cy.get('.MuiTableBody-root td').first().click()
    // Check if song is expanded
    cy.get('.MuiChip-label').first().should('have.text', 'Info')
    cy.get('.MuiChip-label').eq(1).should('have.text', 'Danceability: 83%')
    // Intercept outgoing POST requests to backend
    // Inspired by: https://docs.cypress.io/api/commands/intercept#Aliasing-an-intercepted-route
    cy.intercept('POST', '/graphql', (req) => {
        if (req.body.hasOwnProperty('query') && req.body.query.includes('mutation')) {
          req.alias = 'ratingSent'
        }
      })
    // Rate song 1 star
    cy.get(".MuiRating-visuallyHidden").first().click({force: true})
    // Assert if backend respond with 200-ok when rating
    cy.wait('@ratingSent')
   })
  })