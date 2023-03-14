/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login Spec', () => {
  const classLoadingOverlay = 'mantine-LoadingOverlay-root';
  const classAlert = 'mantine-Text-root mantine-Notification-title';
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(`${baseUrl}/login}`);
  });

  it('should display login page correctly', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should display required email when email is empty', () => {
    cy.get('input[type="password"]').type('zeffry'); // password
    cy.get('button[type="submit"]').click();
    cy.contains('Email is required').should('be.visible');
  });

  it('should display required password when password is empty', () => {
    cy.get('input[type="email"]').type('zeffry.reynando@gmail.com');
    cy.get('button[type="submit"]').click();
    cy.contains('Password is required').should('be.visible');
  });

  it('should display alert when login error', () => {
    cy.get('input[type="email"]').type('zeffry.reynando@gmail.com');
    cy.get('input[type="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.get(`.error-login`).should('be.visible');
  });

  it('should redirect to homepage when username and password are correct', () => {
    cy.get('input[type="email"]').type('zeffry@gmail.com');
    cy.get('input[type="password"]').type('zeffry');
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', `${baseUrl}/`);
    cy.get('.home-page').should('be.visible');
  });
});
