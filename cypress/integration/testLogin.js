describe("Testing login and logout", () => {

  it("Should fill in username and password", () => {
    cy.visit("http://localhost:4200/login");
    cy.get('.username').type('Admin', {delay: 100}).should('have.value', 'Admin');
    cy.get('.password').type('admin', {delay: 100}).should('have.value', 'admin');
  });

  it("Should log in", () => {
    cy.get('.loginBtn').click();
    cy.location('pathname').should('eq', '/'); //maybe empty
  });

  it("Should log out", () => {
    cy.contains('Log Out').click();

    cy.contains('Log in');
    cy.location('pathname').should('eq', '/login');
  })

});
