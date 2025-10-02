/// <reference types="cypress" />

describe('Inicio de Sesion exitoso', () => {
  
  it('debería realizar login exitoso con las credenciales proporcionadas', () => {
    // Primero registrar el usuario
    cy.visit('/');
    cy.contains('Sign up').click();
    
    cy.get('#firstName').type('Mazel');
    cy.get('#lastName').type('Igeta');
    cy.get('#email').type('mazeligetama@gmail.com');
    cy.get('#password').type('Prueba123');
    cy.get('#submit').click();
    
    // Verificar registro exitoso y hacer logout
    cy.url().should('include', '/contactList');
    cy.get('#logout').click();
    
    // Ahora hacer login
    cy.get('#email').type('mazeligetama@gmail.com');
    cy.get('#password').type('Prueba123');
    
    // Hacer clic en el botón Submit
    cy.get('#submit').click();
    
    // Verificar que el login fue exitoso
    cy.url().should('include', '/contactList');
    cy.contains('Contact List').should('be.visible');
    cy.get('#logout').should('be.visible');
  });
  
});