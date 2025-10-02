/// <reference types="cypress" />

describe('Inicio de Sesion exitoso', () => {
  
  it('debería realizar login exitoso con las credenciales proporcionadas', () => {
    
    const email = 'mazeligetama@gmail.com';
    const password = 'Prueba123';
    
    // Visitar la página de login
    cy.visit('/');
    
    // Hacer login directamente con credenciales existentes
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    
    // Hacer clic en el botón Submit
    cy.get('#submit').click();
    
    // Verificar que el login fue exitoso
    cy.url().should('include', '/contactList');
    cy.contains('Contact List').should('be.visible');
    cy.get('#logout').should('be.visible');
  });
  
});