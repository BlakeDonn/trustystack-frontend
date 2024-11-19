describe("Sign In Flow", () => {
  beforeEach(() => {
    cy.visit("/auth/signin");
    cy.on("uncaught:exception", () => false);
  });

  it("should sign in successfully with valid credentials", () => {
    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.contains("Welcome,");
  });

  //it("should initiate GitHub OAuth flow", () => {
  //  cy.mockOAuth("github");
  //  cy.get("button")
  //    .contains(/Sign in with GitHub/i)
  //    .click();
  //  cy.wait("@githubOAuth");
  //  cy.url().should("eq", "http://localhost:3001/");
  //});

  it("should initiate Google OAuth flow", () => {
    cy.mockOAuth("google");
    cy.get("button")
      .contains(/Sign in with Google/i)
      .click();
    cy.wait("@googleOAuth");
    cy.url().should("eq", "http://localhost:3000/");
  });
});
