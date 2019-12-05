describe("Testing User", () => {

  before(function () {
    // runs once before all tests in the block
    cy.visit("http://localhost:4200/login");
    cy.get('#username').type('Admin').should('have.value', 'Admin');
    cy.get('#password').type('admin').should('have.value', 'admin');
    cy.contains('Log in').click();
    cy.location('pathname').should('eq', '/dashboard');
  });

  after(function () {
    // runs once after all tests in the block
    cy.contains('Log Out').click();
    cy.contains('Log in');
    cy.location('pathname').should('eq', '/login');
  });

  it("Should test user functionality while logged in", () => {

    // maybe add contains?  cy.contains('Logout');
    cy.contains('Users').click();
    cy.location('pathname').should('eq', '/admin');
  });

//test create,read update,read delete,read user


});
