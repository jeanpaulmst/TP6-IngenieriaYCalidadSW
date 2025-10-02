/// <reference types="cypress" />

describe('Contact List App - Tests Negativos de Login', () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('debería mostrar error con email en formato inválido', () => {
    cy.get('#email').type('email-invalido');
    cy.get('#password').type('Password123');
    cy.get('#submit').click();
    
    // Verificar validación de email
    cy.get('#email').then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty;
    });
  });

});