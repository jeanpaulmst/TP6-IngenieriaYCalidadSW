/// <reference types="cypress" />

describe('Inicio de Sesión Inválido por Contraseña Incorrecta', () => {
  
  /**
   * OBJETIVO:
   * Verificar que el sistema de autenticación rechaza correctamente 
   * el acceso cuando se proporciona un email válido pero una contraseña incorrecta,
   * mostrando el mensaje de error apropiado al usuario.
   */
  
  beforeEach(() => {
    // Navegar a la página de login antes de cada test
    cy.visit('/');
  });

  it('debería mostrar error al intentar login con email válido pero contraseña incorrecta', () => {
    
    /**
     * PASO A PASO:
     * 1. Navegar a la página de login
     * 2. Ingresar un email válido (formato correcto)
     * 3. Ingresar una contraseña incorrecta
     * 4. Hacer clic en el botón Submit
     * 5. Verificar que aparece mensaje de error
     * 6. Verificar que NO se redirige a la página de contactos
     * 7. Verificar que permanece en la página de login
     */
    
    // Email válido en formato pero que sabemos que existe en el sistema
    const emailValido = 'matiqnselmi02@gmail.com'; // Usuario con credenciales conocidas
    const contrasenaIncorrecta = 'ContraseñaIncorrecta123!';
    
    // Paso 1: Ya estamos en la página de login por el beforeEach
    
    // Paso 2: Ingresar email válido
    cy.get('#email').type(emailValido);
    
    // Paso 3: Ingresar contraseña incorrecta
    cy.get('#password').type(contrasenaIncorrecta);
    
    // Paso 4: Hacer clic en Submit
    cy.get('#submit').click();
    
    // RESULTADOS ESPERADOS:
    
    // Paso 5: Verificar que aparece mensaje de error
    cy.get('#error').should('be.visible');
    cy.get('#error').should('contain.text', 'Incorrect username or password');
    
    // Paso 6: Verificar que NO se redirige a contactList
    cy.url().should('not.include', '/contactList');
    
    // Paso 7: Verificar que permanece en la página de login
    cy.url().should('include', 'herokuapp.com');
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#submit').should('be.visible');
    
    // Verificación adicional: Los campos deberían mantenerse visibles para reintento
    cy.get('#email').should('have.value', emailValido);
  });

  it('debería limpiar el mensaje de error al corregir las credenciales', () => {
    
    /**
     * OBJETIVO ADICIONAL:
     * Verificar que después de mostrar un error por contraseña incorrecta,
     * el usuario puede corregir sus credenciales y acceder exitosamente.
     */
    
    const emailValido = 'matiqnselmi02@gmail.com';
    const contrasenaIncorrecta = 'ContraseñaIncorrecta123!';
    const contrasenaCorrecta = 'Prueba1234';
    
    // Primero intentar con contraseña incorrecta
    cy.get('#email').type(emailValido);
    cy.get('#password').type(contrasenaIncorrecta);
    cy.get('#submit').click();
    
    // Verificar que aparece el error
    cy.get('#error').should('be.visible');
    
    // Limpiar el campo de contraseña e ingresar la correcta
    cy.get('#password').clear().type(contrasenaCorrecta);
    cy.get('#submit').click();
    
    // RESULTADO ESPERADO: Login exitoso
    cy.url().should('include', '/contactList', { timeout: 10000 });
    cy.contains('Contact List').should('be.visible');
    cy.get('#logout').should('be.visible');
  });
  
});