describe("Testing User", () => {

  it("Should login ", () => {
    cy.visit("http://localhost:4200/login");
    cy.get('.username').type('Admin').should('have.value', 'Admin');
    cy.get('.password').type('admin').should('have.value', 'admin');
    cy.get('.loginBtn').click();

  });

  it("Should test user functionality while logged in", () => {

    // maybe add contains?  cy.contains('Logout');
    cy.location('pathname').should('eq', '/'); //maybe empty
  });

//test create,read update,read delete,read user



  it("Should log out", () => {
    cy.get('.logoutBtn').click();

    cy.contains('Login');
    cy.location('pathname').should('eq', '/login');
  })

});
