describe("Testing login and logout", () => {

  it("Should fill in username and password", () => {
    cy.visit("http://localhost:4200/login");
    cy.get('#username').type('Admin', {delay: 100}).should('have.value', 'Admin');
    //  cy.contains('Username').type('Admin').should('have.value', 'Admin'); // better practice

    cy.get('#password').type('admin', {delay: 100}).should('have.value', 'admin');
  });

  it("Should log in", () => {
    cy.contains('Log in').click();
    cy.location('pathname').should('eq', '/dashboard');
  });

  it('should show navbar when logged in', () => {
    cy.contains('Dashboard');
    cy.contains('Userpage');
    cy.contains('Users');
    cy.contains('Devices');
    cy.contains('Device Outputs');
    cy.contains('Log Out');
  });

  it("Should log out", () => {
    cy.contains('Log Out').click();
    cy.contains('Log in');
    cy.location('pathname').should('eq', '/login');
  })
});
