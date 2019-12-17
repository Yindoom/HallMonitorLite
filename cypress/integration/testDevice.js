describe("Testing Device", () => {

  before(function () {
    // runs once before all tests in the block
    cy.visit("http://localhost:4200/login");
    cy.get('#username').type('Admin').should('have.value', 'Admin');
    cy.get('#password').type('admin').should('have.value', 'admin');
    cy.get('#loginBtn').click();
    cy.location('pathname').should('eq', '/dashboard');
  });

  after(function () {
    // runs once after all tests in the block
    cy.contains('Log Out').click();
    cy.location('pathname').should('eq', '/login');
  });

  it("Should visit page of devices", () => {
    cy.contains('Devices').click();
    cy.location('pathname').should('eq', '/devices');
  });

  it("Should see a list of devices", () => {
    cy.contains('Comment:');
  });
});
