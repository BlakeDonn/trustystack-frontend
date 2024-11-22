/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      mockOAuth(provider: "github" | "google"): Chainable<void>;
    }
  }
}

Cypress.Commands.add("mockOAuth", (provider: "github" | "google") => {
  // Mock the OAuth initiation POST request
  cy.intercept("POST", `/api/auth/signin/${provider}`, (req) => {
    console.log(`Intercepted ${provider} OAuth POST request:`, req);
    req.reply({
      statusCode: 200,
      body: {
        user: {
          name: "Test User",
          email: "test@example.com",
        },
      },
      headers: {
        "Set-Cookie": "next-auth.session-token=mock_session_token",
      },
    });
  }).as(`${provider}OAuth`);

  // Mock the session check
  cy.intercept("GET", "/api/auth/session", (req) => {
    console.log(`Intercepted session GET request:`, req);
    req.reply({
      statusCode: 200,
      body: {
        user: {
          name: "Test User",
          email: "test@example.com",
        },
      },
    });
  }).as("session");
});

export { };
