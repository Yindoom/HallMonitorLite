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

  /*
  it("Should create a new device", () => {
    cy.get('[data-cy=createDevice]').click();
    cy.get('[data-cy=comment]').type('New Device From Cypress');
    cy.contains('Create').click();
  });

  it("Should see the newly created device", () => {
    cy.contains('New Device From Cypress');
  });

    it("Should update device", () => {
      cy.get('[data-cy=updateDevice]').last().click();
      cy.get('[data-cy=comment]').type('Edited Device From Cypress');
      cy.contains('Edited Device From Cypress');
    });

      it("Should remove device", () => {
        cy.get('[data-cy=deleteDevice]').last().click();
        //check it's not there
      });
  */
});
