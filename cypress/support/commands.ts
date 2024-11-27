// cypress/support/commands.ts

Cypress.Commands.add("mockUserSession", (role = "user") => {
  const userSession = {
    user: {
      name: role === "admin" ? "Admin User" : "Regular User",
      email: role === "admin" ? "admin@example.com" : "user@example.com",
    },
    expires: "1",
  };

  cy.intercept("GET", "/api/auth/session", {
    statusCode: 200,
    body: userSession,
  }).as("session");
});

Cypress.Commands.add("signInWithGoogle", () => {
  // Intercept the Google sign-in API call
  cy.intercept("POST", "/api/auth/signin/google", {
    statusCode: 200,
    body: { url: "/api/auth/callback/google" },
  }).as("googleSignIn");

  // Intercept the OAuth callback to simulate a redirect to /dashboard
  cy.intercept("GET", "/api/auth/callback/google", (req) => {
    req.reply({
      statusCode: 302, // Redirect status
      headers: {
        Location: "/dashboard", // Redirect to dashboard
        "Set-Cookie":
          "next-auth.session-token=mocked-session-token; Path=/; HttpOnly",
      },
    });
  }).as("authCallback");

  // Click the Google sign-in button
  cy.contains("button", "Sign in with Google").click();

  cy.wait("@googleSignIn");
  cy.wait("@authCallback");
});

// Extend the Cypress namespace to include the new command
declare global {
  namespace Cypress {
    interface Chainable {
      signInWithGoogle(): Chainable<void>;
      mockUserSession(role: string): Chainable<void>;
    }
  }
}

export { };
