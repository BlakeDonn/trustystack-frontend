describe("Sign In Flow", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });

  it("displays sign in page", () => {
    cy.get("h1").should("contain", "Sign In");
    cy.contains("Sign in with Google").should("be.visible");
  });

  it("handles Google OAuth sign in", () => {
    cy.intercept("POST", "/api/auth/signin/google", {
      statusCode: 200,
      body: { url: "/api/auth/callback/google" },
    }).as("googleSignIn");

    cy.contains("Sign in with Google").click();
    cy.wait("@googleSignIn");
  });
});
