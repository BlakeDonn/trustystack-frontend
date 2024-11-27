// cypress/integration/signin_flow.spec.js

describe("Sign In Flow", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });

  it("displays sign in page", () => {
    cy.get("h1").should("contain", "Sign In");
    cy.contains("Sign in with Google").should("be.visible");
  });

  it("handles Google OAuth sign in and redirects to dashboard", () => {
    cy.intercept("POST", "/api/auth/signin/google", {
      statusCode: 200,
      body: { url: "/api/auth/callback/google" },
    }).as("googleSignIn");

    cy.intercept("GET", "/api/auth/callback/google", {
      statusCode: 200,
      body: { user: { name: "Test User", email: "test@example.com" } },
    }).as("oauthCallback");

    // Trigger the sign-in action
    cy.get("button").contains("Sign in with Google").click();

    // Wait for the intercept to complete
    cy.wait("@googleSignIn");
    cy.wait("@oauthCallback");

    // Check for redirection
    cy.url().should("include", "/callback");
  });
});

describe("Dashboard Access After Sign In", () => {
  beforeEach(() => {
    // Mock the session to simulate a signed-in user
    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      body: {
        user: {
          name: "Test User",
          email: "test@example.com",
        },
      },
    }).as("session");

    // Visit the dashboard directly
    cy.visit("/dashboard");
  });

  it("displays the welcome message when user is signed in", () => {
    // Wait for the session intercept to complete
    cy.wait("@session");

    // Check for the welcome message
    cy.contains("Welcome, Test User!").should("be.visible");
    cy.contains("Your email: test@example.com").should("be.visible");
  });

  it("displays a loading state while session is loading", () => {
    // Simulate loading state
    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      delay: 1000, // Simulate a delay
      body: {},
    }).as("sessionLoading");

    // Visit the dashboard
    cy.visit("/dashboard");

    // Check for loading state
    cy.contains("Loading...").should("be.visible");
  });

  it("displays a message when not authenticated", () => {
    // Mock the session to simulate a user not signed in
    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      body: null,
    }).as("sessionNotAuthenticated");

    // Visit the dashboard
    cy.visit("/dashboard");

    // Wait for the session intercept to complete
    cy.wait("@sessionNotAuthenticated");

    // Check for the not signed in message
    cy.contains("You are not signed in.").should("be.visible");
  });
});
