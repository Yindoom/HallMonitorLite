describe("Testing Device", () => {

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

  it("Should visit page of devices", () => {
    cy.contains('Devices').click();
    cy.location('pathname').should('eq', '/devices');
  });

  it("Should see a list of devices", () => {
    cy.contains('Id:');
    cy.contains('Comment:');
    //test the buttons too??
  });

  it("Should create a new device", () => {
    cy.get('[data-cy=createDevice]').click();
    cy.get('[data-cy=comment]').type('New Device From Cypress');
    cy.get('[data-cy=adminId]').type('1');
    cy.contains('Create').click();
    //does not actually create???
  });

    it("Should see the newly created device", () => {
      cy.contains('Cypress Device');
  });
  /*
    it("Should update device", () => {
      //click update button
      //change text
      //check text has changed
      //change it back
      //check it's successful
    });

    it("Should remove device", () => {
      //click trashcan
      cy.get('[data-cy=deleteDevice]');
      //check it's not there
    });
  */
});
