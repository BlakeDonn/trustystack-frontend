/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      mockOAuth(provider: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('mockOAuth', (provider: string) => {
  // Intercept the CSRF token request that happens before OAuth
  cy.intercept('GET', '/api/auth/csrf', {
    statusCode: 200,
    body: { csrfToken: 'fake-csrf-token' }
  });

  // Intercept the OAuth sign-in request
  cy.intercept('POST', `/api/auth/signin/${provider}`, {
    statusCode: 302,
    headers: {
      'Location': `http://localhost:3001/api/auth/callback/${provider}?code=mock_code`
    }
  }).as(`${provider}OAuth`);
  
  // Intercept the callback URL
  cy.intercept('GET', `/api/auth/callback/${provider}**`, {
    statusCode: 200,
    fixture: 'oauth-callback.json'
  });
});

export {};