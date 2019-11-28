describe("Testing login and logout", () => {

  it("Should fill in username and password", () => {
    cy.visit("http://localhost:4200/login");
    cy.get('.username').type('Admin').should('have.value', 'Admin');
    cy.get('.password').type('admin').should('have.value', 'admin');
  });

  it("Should log in", () => {
    cy.get('.loginBtn').click();
    // maybe add contains?  cy.contains('Logout');
    cy.location('pathname').should('eq', '/'); //maybe empty
  });

  it("Should log out", () => {
    cy.get('.logoutBtn').click();

    cy.contains('Log in');
    cy.location('pathname').should('eq', '/login');
  })

});
