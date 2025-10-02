/// <reference types="cypress" />

describe('Contact List App - Tests Básicos', () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('debería cargar la página principal correctamente', () => {
    cy.url().should('include', 'herokuapp.com');
    cy.get('body').should('be.visible');
  });

  it('debería mostrar el título de la aplicación', () => {
    cy.contains('Contact List').should('be.visible');
  });

  it('debería tener un formulario de login', () => {
    cy.get('input[id="email"]').should('be.visible');
    cy.get('input[id="password"]').should('be.visible');
    cy.get('button[id="submit"]').should('be.visible');
  });
});