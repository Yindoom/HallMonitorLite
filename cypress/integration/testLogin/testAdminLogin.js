describe("Testing login and logout for Admin", () => {

  before(() => {
    // runs once before all tests in the block
    cy.visit("http://localhost:4200/login");
    cy.get('#username').type('cypressAdmin', {delay: 100}).should('have.value', 'cypressAdmin');
    cy.get('#password').type('cypress1', {delay: 100}).should('have.value', 'cypress1');

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

  it('should show current user when clicking userpage', () => {
    cy.contains('Userpage').click();
    cy.location('pathname').should('eq', '/user');
    cy.contains('cypressAdmin');
    cy.contains('cypressAdmin@email.dk');
  });

  it('should show user belonging to this admin when clicking Users', () => {
    cy.contains('Users').click();
    cy.location('pathname').should('eq', '/users');
    cy.contains('User');
    cy.contains('cypressUser@email.dk');
  });
});
