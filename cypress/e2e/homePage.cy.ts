describe('Home Page Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Should load the page correctly', () => {
        cy.get('input[type="text"]').should('exist').and('be.visible');
        cy.get('.menu-button').should('have.length', 4);
    });

    it('Should have a working "Adicionar exame" button', () => {
        cy.contains('Adicionar exame').should('be.visible');
        cy.contains('Adicionar exame').click();
        cy.url().should('include', '/new');
    });

    it('Should have a working "Exames armazenados" button', () => {
        cy.contains('Exames armazenados').should('be.visible');
        cy.contains('Exames armazenados').click();
        cy.url().should('include', '/uploads');
    });

    it('Should have a working "Visualizar Distribuição" button', () => {
        cy.contains('Visualizar Distribuição').should('be.visible');
        cy.contains('Visualizar Distribuição').click();
        cy.url().should('include', '/analytics');
    });

    it('Should have a working "Novo Laudo" button', () => {
        cy.contains('Novo Laudo').should('be.visible');
        cy.contains('Novo Laudo').click();
        cy.url().should('include', '/new-report');
    });

    it('Should have a working search bar', () => {
        cy.get('input[type="text"]').should('be.visible');
        cy.get('input[type="text"]').type('Maria');
        cy.get('input[type="text"]').should('have.value', 'Maria');
        cy.intercept('GET', '/api/patients*', {
            statusCode: 200,
            body: [{ name: 'Maria' }]
        }).as('searchRequest');
        cy.wait('@searchRequest');
    });
    
});

