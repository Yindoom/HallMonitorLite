describe("Testing device guards", () => {

  it("Should try to access page admin without being logged in ", () => {
    cy.visit("http://localhost:4200/admin");
    cy.location('pathname').should('eq', '/login');
  });

  it("Should try to access page devices without being logged in ", () => {
    cy.visit("http://localhost:4200/devices");
    cy.location('pathname').should('eq', '/login');
  });

  it("Should try to access page dashboard without being logged in ", () => {
    cy.visit("http://localhost:4200/dashboard");
    cy.location('pathname').should('eq', '/login');
  });

  it("Should try to access page user without being logged in ", () => {
    cy.visit("http://localhost:4200/user");
    cy.location('pathname').should('eq', '/login');
  });

  it("Should try to access page login without being logged in ", () => {
    cy.visit("http://localhost:4200/login");
    cy.location('pathname').should('eq', '/login');
  });

  it("Should try to access page with random url without being logged in ", () => {
    cy.visit("http://localhost:4200/asdasd");
    cy.contains('Page not found');
    cy.location('pathname').should('eq', '/asdasd');
  });


  it("Should test security while logged in", () => {

    // maybe add contains?  cy.contains('Logout');
   // cy.location('pathname').should('eq', '/'); //maybe empty
  });

});
