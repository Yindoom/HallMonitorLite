import {describe, it} from "cypress";

describe("Testing Device", () => {
  before(function() {
    // runs once before all tests in the block
    //should log in?
  });

  after(function() {
    // runs once after all tests in the block
    //should log out?
  });

  it("Should login ", () => {
    cy.visit("http://localhost:4200/login");
    cy.get('.username').type('Admin').should('have.value', 'Admin');
   // cy.contains('Username').type('Admin').should('have.value', 'Admin'); // better practice
    cy.get('.password').type('admin').should('have.value', 'admin');
    cy.get('.loginBtn').click();

  });

  it("Should test device functionality while logged in", () => {

    // read all devices, create new device, update device, remove device
    cy.location('pathname').should('eq', '/'); //maybe empty
  });

  it("Should log out", () => {
    cy.get('.logoutBtn').click();

    cy.contains('Log in');
    cy.location('pathname').should('eq', '/login');
  })

});
