// cypress/support/commands.ts

Cypress.Commands.add("mockUserSession", (role = "user", isLoggedIn = true) => {
  const userSession = isLoggedIn
    ? {
        user: {
          name: role === "admin" ? "Admin User" : "Regular User",
          email: role === "admin" ? "admin@example.com" : "user@example.com",
        },
        expires: "1",
      }
    : {};

  cy.intercept("GET", "/api/auth/session", {
    statusCode: 200,
    body: userSession,
  }).as(isLoggedIn ? "session" : "sessionAfterLogout");
});

Cypress.Commands.add("signInWithGoogle", (role = "user") => {
  // Mock the Google sign-in API call
  cy.intercept("POST", "/api/auth/signin/google", {
    statusCode: 200,
    body: { url: "/api/auth/callback/google" },
  }).as("googleSignIn");

  // Mock the OAuth callback to simulate a redirect to /dashboard
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

  // Mock the user session based on the role
  cy.mockUserSession(role);

  // Click the Google sign-in button
  cy.contains("button", "Sign in with Google").click();

  // Wait for the mocked API calls to complete
  cy.wait("@googleSignIn");
  cy.wait("@authCallback");
});

Cypress.Commands.add("mockSignOut", () => {
  cy.intercept("POST", "/api/auth/signout", {
    statusCode: 200,
    body: { message: "Signed out successfully" },
    headers: {
      "Set-Cookie":
        "next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly",
    },
  }).as("signOut");
});

// Extend the Cypress namespace to include the new commands
declare global {
  namespace Cypress {
    interface Chainable {
      signInWithGoogle(role?: string): Chainable<void>;
      mockUserSession(role: string, isLoggedIn?: boolean): Chainable<void>;
      mockSignOut(): Chainable<void>;
    }
  }
}

export { }; // Ensure this file is treated as a module
