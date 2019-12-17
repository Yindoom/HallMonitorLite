describe("Testing User", () => {

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

  it("Should route to the user page when clicking the user in navbar", () => {
    cy.contains('Userpage').click();
    cy.location('pathname').should('eq', '/user');
  });

  it("Should see the logged in user", () => {
    cy.contains('Id:');
    cy.contains('Username:');
    cy.contains('Email:');
    cy.contains('Admin');
  });
});
