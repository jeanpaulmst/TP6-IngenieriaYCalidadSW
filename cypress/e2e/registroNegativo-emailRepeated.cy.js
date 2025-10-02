/// <reference types="cypress" />

describe('Contact List App - Registro con email duplicado', () => {
  const emailExistente = 'mazeligetama@gmail.com'; // email ya registrado en la app

  beforeEach(() => {
    cy.visit('/');
    cy.get('#signup').click(); // ir al formulario de registro
  });

  it('debería mostrar error si se intenta registrar con un email ya existente', () => {
    cy.get('#firstName').type('Usuario');
    cy.get('#lastName').type('Duplicado');
    cy.get('#email').type(emailExistente);
    cy.get('#password').type('Password123!');

    cy.get('#submit').click();

    // Validar que se muestra el mensaje de error
    cy.get('#error').should('be.visible');
    cy.get('#error').should('contain', 'email'); // el mensaje debería mencionar el email duplicado
  });
});
    