describe("Testing login and logout for superAdmin", () => {

  before(() => {
    // runs once before all tests in the block
    cy.visit("http://localhost:4200/login");
    cy.get('#username').type('Admin', {delay: 100}).should('have.value', 'Admin');
    cy.get('#password').type('admin', {delay: 100}).should('have.value', 'admin');

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
    cy.contains('Users');
    cy.contains('Devices');
    cy.contains('Log Out');
  });
});
