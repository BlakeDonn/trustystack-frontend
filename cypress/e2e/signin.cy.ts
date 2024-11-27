// cypress/e2e/signin.cy.ts

describe("Sign In Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays sign in page", () => {
    cy.contains("Sign in with Google").should("be.visible");
  });

  it("handles Google OAuth sign in and redirects to dashboard", () => {
    // Sign in as a regular user
    cy.signInWithGoogle("user");

    // Verify redirection to dashboard
    cy.url().should("include", "/dashboard");

    // Assert that the session cookie is set
    cy.getCookie("next-auth.session-token").should("exist");
  });

  it("handles Google OAuth sign in as admin and redirects to dashboard", () => {
    // Sign in as an admin user
    cy.signInWithGoogle("admin");

    // Verify redirection to dashboard
    cy.url().should("include", "/dashboard");

    // Assert that the session cookie is set
    cy.getCookie("next-auth.session-token").should("exist");
  });
});

// cypress/e2e/dashboard.cy.ts

describe("Dashboard Access", () => {
  beforeEach(() => {
    cy.mockUserSession("admin"); // Mocking an admin user session
    cy.visit("/dashboard");
  });

  it("displays the welcome message for admin", () => {
    cy.contains("Welcome, Admin User!").should("be.visible");
    cy.contains("Your email: admin@example.com").should("be.visible");
  });

  it("displays the welcome message for regular user", () => {
    cy.mockUserSession("user"); // Mocking a regular user session
    cy.visit("/dashboard");

    cy.contains("Welcome, Regular User!").should("be.visible");
    cy.contains("Your email: user@example.com").should("be.visible");
  });
});
