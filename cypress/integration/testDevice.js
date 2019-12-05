describe("Testing Device", () => {

  before(function () {
    // runs once before all tests in the block
    cy.visit("http://localhost:4200/login");
    cy.get('#username').type('Admin').should('have.value', 'Admin');
    cy.get('#password').type('admin').should('have.value', 'admin');
    cy.contains('Log in').click();
    cy.location('pathname').should('eq', '/');
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
    cy.contains('comment').type('New Device From Cypress');
    cy.contains('admin').type('1');
    cy.contains('create').click();
  });

  it("Should see the newly created device", () => {
    cy.contains('New Device From Cypress').should('eq', 'New Device From Cypress');
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
    //check it's not there
  });
*/
});

/*
 it("Should fill in username and password", () => {
    cy.visit("http://localhost:4200/login");
    cy.get('#username').type('Admin', {delay: 100}).should('have.value', 'Admin');
   //  cy.contains('Username').type('Admin').should('have.value', 'Admin'); // better practice

    cy.get('#password').type('admin', {delay: 100}).should('have.value', 'admin');
  });

  it("Should log in", () => {
    cy.contains('Log in').click();
    cy.location('pathname').should('eq', '/');
  });

  it("Should log out", () => {
    cy.contains('Log Out').click();

    cy.contains('Log in');
    cy.location('pathname').should('eq', '/login');
  })
 */
