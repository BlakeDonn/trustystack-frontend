describe("Logout Flow", () => {
  beforeEach(() => {
    cy.mockUserSession("user");
    cy.visit("/dashboard");
  });

  it("logs out successfully and removes the session", () => {
    cy.mockSignOut();

    cy.get('button[data-slot="trigger"]').click();

    cy.get('li[data-key="logout"]').click();

    cy.wait("@signOut");

    cy.mockUserSession("user", false);

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);

    cy.getCookie("next-auth.session-token").should("not.exist");

    cy.contains("Sign in with Google").should("be.visible");
  });
}); 