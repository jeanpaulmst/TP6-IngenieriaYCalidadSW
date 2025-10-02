describe('Contact List App - Validación de Registro', () => {
  beforeEach(() => {
    cy.visit('/');
    // Navegar a la página de registro
    cy.get('#signup').click();
  });

  it('debería mostrar error al registrarse con email inválido', () => {
    // Intentar registrar con email sin formato válido
    cy.get('#firstName').type('Juan');
    cy.get('#lastName').type('Pérez');
    cy.get('#email').type('correo-invalido');
    cy.get('#password').type('Password123!');
    cy.get('#submit').click();

    // Verificar que aparece un mensaje de error
    cy.get('#error').should('be.visible');
    cy.get('#error').should('contain', 'email');
  });

  it('debería mostrar error al registrarse con contraseña muy corta', () => {
    cy.get('#firstName').type('Juan');
    cy.get('#lastName').type('Pérez');
    cy.get('#email').type('test@ejemplo.com');
    cy.get('#password').type('123'); // Contraseña demasiado corta
    cy.get('#submit').click();

    // Verificar mensaje de error
    cy.get('#error').should('be.visible');
    cy.get('#error').should('contain', 'password');
  });

  it('debería mostrar error con email vacío', () => {
    cy.get('#firstName').type('Juan');
    cy.get('#lastName').type('Pérez');
    cy.get('#password').type('Password123!');
    cy.get('#submit').click();

    cy.get('#error').should('be.visible');
  });

  it('debería mostrar error con contraseña vacía', () => {
    cy.get('#firstName').type('Juan');
    cy.get('#lastName').type('Pérez');
    cy.get('#email').type('test@ejemplo.com');
    cy.get('#submit').click();

    cy.get('#error').should('be.visible');
  });

  it('debería mostrar error con todos los campos vacíos', () => {
    cy.get('#submit').click();
    cy.get('#error').should('be.visible');
  });
});