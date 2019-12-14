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

  it("Should route to the user page when clicking the user in navbar", () => {
    cy.contains('Userpage').click();
    cy.location('pathname').should('eq', '/user');
  });

  it("Should see the logged in user", () => {
    cy.contains('Id:');
    cy.contains('Username:');
    cy.contains('Email:');
   // cy.contains('oldEmail@email.dk');
    cy.contains('Admin'); //or whichever user we decide to do it with
  });
/*
  it("Should update the logged in user", () => {
    cy.contains('Update User').click();
    cy.contains('oldEmail@email.dk').clear().type('newEmail@email.dk'); //type, might need get+ id instead of contains
    cy.contains('Update').click();

  });

  it("Should see the newly updated user info", () => {
    cy.contains('newEmail@email.dk');
  });

  it("Should update the logged in user to the original information", () => {
    cy.contains('Update User').click();
    cy.contains('').clear().type('oldEmail@email.dk'); //type, might need get+ id instead of contains
    cy.contains('Update').click();
  });

  it("Should see the original user info", () => {
    cy.contains('oldEmail@email.dk');
  });
*/
});
