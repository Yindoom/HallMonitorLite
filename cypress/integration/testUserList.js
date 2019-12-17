describe("Testing User", () => {

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

  it("Should route to userlist when clicking users in navbar", () => {
    cy.contains('Users').click();
    cy.location('pathname').should('eq', '/users');
  });
  /*
   it("Should create new user with role admin??", () => {
     cy.get('[data-cy=createUser]').click();
     cy.get('[data-cy=email]').type('email@email.dk');
     cy.get('[data-cy=username]').type('newUser');
     cy.get('[data-cy=password]').type('password');
     cy.get('[data-cy=passwordTwo]').type('password');
     cy.contains('Create').click();
   });

   it('should contain newly created user', () => {
   //  cy.contains('email@email.dk').should('have.value', 'email@email.dk');
     cy.contains('email@email.d;
   });
   /*
     it("Should update new user with role admin", () => {
       cy.get('[data-cy="updateUser]').last().click();
       //type
       cy.location('pathname').should('eq', '/users');
     });

     it("Should remove the new user with role admin", () => {
       cy.get('[data-cy=deleteUser]').last().click();
     });

*/

});
