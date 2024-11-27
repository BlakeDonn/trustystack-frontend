describe("Logout Flow", () => {
  beforeEach(() => {
    cy.mockUserSession("user");
    cy.visit("/dashboard");
  });

  it("logs out successfully and removes the session", () => {
    cy.mockSignOut();

    cy.get('button[data-slot="trigger"]').should('be.visible').click();

    cy.get('li[data-key="logout"]').should('be.visible').click();

    cy.wait("@signOut");

    cy.mockUserSession("user", false);

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);

    cy.getCookie("next-auth.session-token").should("not.exist");

    cy.get('button').contains("Sign in with Google", { timeout: 10000 })
      .should('exist')
      .should('be.visible');
  });
});
