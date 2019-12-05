describe("Testing Device Output", () => {

  it("Should login ", () => {
    cy.visit("http://localhost:4200/login");
    cy.get('.username').type('Admin').should('have.value', 'Admin');
    cy.get('.password').type('admin').should('have.value', 'admin');
    cy.get('.loginBtn').click();
    cy.location('pathname').should('eq', '/');
  });

  it("Should test deviceOutput functionality while logged in", () => {

    cy.contains('Device Outputs').click();
    // maybe add contains?  cy.contains('Logout');
    cy.location('pathname').should('eq', '/deviceOutputs'); //maybe empty
  });

//test create,read update,read delete,read deviceoutput


  it("Should log out", () => {
    cy.get('.logoutBtn').click();

    cy.contains('Log in');
    cy.location('pathname').should('eq', '/login');
  })

});
