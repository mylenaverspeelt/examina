import 'cypress-file-upload';

Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('An unknown error has occurred') || err.message.includes('[object Object]')) {
        return false;
    }
    return true;
});

describe('Uploads Page Tests', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/getAllPdfs', {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    name: 'Test PDF 1',
                    fileName: 'test1.pdf',
                    base64Pdf: 'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G',
                    createdAt: '2024-01-17T10:00:00Z'
                },
                {
                    id: 2,
                    name: 'Test PDF 2',
                    fileName: 'test2.pdf',
                    base64Pdf: 'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G',
                    createdAt: '2024-01-17T11:00:00Z'
                }
            ]
        }).as('getPdfs');

        cy.intercept('DELETE', '/api/deletePdf', {
            statusCode: 200
        }).as('deletePdf');

        cy.visit('/uploads');
    });

    it('Should load the page correctly', () => {
        cy.contains('h1', 'Exames arquivados').should('be.visible');
        cy.wait('@getPdfs');
    });

    it('Should display the list of PDFs', () => {
        cy.wait('@getPdfs');
        cy.get('.pdf-button').should('have.length', 2);
        cy.contains('.pdf-button', 'test1.pdf').should('exist');
        cy.contains('.pdf-button', 'test2.pdf').should('exist');
    });

    it('Should show "no PDFs" message when list is empty', () => {
        cy.intercept('GET', '/api/getAllPdfs', {
            statusCode: 200,
            body: []
        }).as('getEmptyPdfs');

        cy.visit('/uploads');
        cy.wait('@getEmptyPdfs');
        cy.contains('Nenhum exame arquivado encontrado').should('be.visible');
    });

    it('Should handle PDF deletion', () => {
        cy.wait('@getPdfs');
        cy.get('.MuiIconButton-colorError').first().click();
        cy.wait('@deletePdf');

        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('contain', 'PDF excluído com sucesso!');
    });

    it('Should handle PDF deletion error', () => {
        cy.intercept('DELETE', '/api/deletePdf', {
            statusCode: 500,
            body: { error: 'Failed to delete' }
        }).as('deleteError');

        cy.wait('@getPdfs');
        cy.get('.MuiIconButton-colorError').first().click();
        cy.wait('@deleteError');
        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('contain', 'Falha ao excluir o PDF.');
    });

    it('Should handle PDF viewing', () => {
        cy.wait('@getPdfs');
        cy.window().then((win) => {
            cy.stub(win, 'open').returns({
                document: {
                    write: cy.stub(),
                    title: ''
                }
            });
        });

        cy.get('.pdf-button').first().click();
        cy.window().its('open').should('be.called');
    });
});