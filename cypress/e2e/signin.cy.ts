describe('Sign In Flow', () => {
  it('should sign in successfully with valid credentials', () => {
    cy.visit('/auth/signin');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.contains('Welcome,');
  });
}); 