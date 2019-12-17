describe("Testing login and logout for user", () => {

  before(() => {
    // runs once before all tests in the block
    cy.visit("http://localhost:4200/login");
    cy.get('#username').type('cypressUser', {delay: 100}).should('have.value', 'cypressUser');
    cy.get('#password').type('cypress2', {delay: 100}).should('have.value', 'cypress2');

    cy.get('#loginBtn').click();
    cy.location('pathname').should('eq', '/dashboard');
  });

  after(() => {
    // runs once after all tests in the block
    cy.contains('Log Out').click();
    cy.location('pathname').should('eq', '/login');
  });

  it('should show navbar when logged in', () => {
    cy.contains('Dashboard');
    cy.contains('Userpage');
    cy.contains('Log Out');
  });
});
