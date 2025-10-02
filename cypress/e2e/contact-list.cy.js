/// <reference types="cypress" />

describe("Contact List App - Tests Básicos", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("debería cargar la página principal correctamente", () => {
        cy.url().should("include", "herokuapp.com");
        cy.get("body").should("be.visible");
    });

    it("debería mostrar el título de la aplicación", () => {
        cy.contains("Contact List").should("be.visible");
    });

    it("debería tener un formulario de login", () => {
        cy.get('input[id="email"]').should("be.visible");
        cy.get('input[id="password"]').should("be.visible");
        cy.get('button[id="submit"]').should("be.visible");
    });

    it("debería registrar un nuevo usuario correctamente", () => {
        // Generar un email único para evitar conflictos con registros previos
        const timestamp = Date.now();
        const emailUnico = `usuario${timestamp}@test.com`;
        const passwordValida = "Test123!@#";

        // Navegar a la página de registro
        cy.contains("Sign up").click();

        // Verificar que estamos en la página de registro
        cy.url().should("include", "/addUser");

        // Completar el formulario de registro
        cy.get('input[id="firstName"]').type("Usuario");
        cy.get('input[id="lastName"]').type("Prueba");
        cy.get('input[id="email"]').type(emailUnico);
        cy.get('input[id="password"]').type(passwordValida);

        // Enviar el formulario
        cy.get('button[id="submit"]').click();

        // Verificar que el registro fue exitoso
        // El sistema debería redirigir a la página de contactos o mostrar mensaje de éxito
        cy.url().should("include", "/contactList", { timeout: 10000 });

        // Verificar que estamos autenticados viendo algún elemento de la página de contactos
        cy.contains("Contact List", { timeout: 5000 }).should("be.visible");

        // Opcional: Verificar que podemos hacer logout
        cy.get('button[id="logout"]').should("be.visible");
    });
});
