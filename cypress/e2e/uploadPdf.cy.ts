
import 'cypress-file-upload';

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('An unknown error has occurred') || err.message.includes('[object Object]')) {
    return false;
  }
  return true;
});

describe('PDF Upload Test', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/uploadPdf', {
      statusCode: 200,
      body: {
        success: true,
        message: 'Arquivo salvo com sucesso!',
      },
    }).as('uploadRequest');

    cy.visit('/new');
  });

  it('Should load the page correctly', () => {
    cy.contains('Adicione um novo exame').should('be.visible');
    cy.get('.filepond--label-action').should('contain', 'selecione seu arquivo');
  });

  it('Should allow uploading a valid PDF file and show "Exames Arquivados" button ', () => {
    cy.get('input[type="file"]').attachFile('correctPdf.pdf'); 
    cy.wait('@uploadRequest');

    cy.get('.swal2-html-container', { timeout: 20000 })
      .should('be.visible')
      .should('contain', 'Arquivo salvo com sucesso!');

    cy.get('a.MuiButton-root')
      .should('be.visible')
      .should('contain', 'Exames Arquivados')
      .should('have.attr', 'href', '/uploads');
  });

  it('Should show an error for an invalid file', () => {
    cy.get('input[type="file"]').attachFile({
      filePath: 'text.txt',
      mimeType: 'text/plain', 
    });

    cy.contains('Apenas arquivos PDF são permitidos.', { timeout: 10000 })
      .should('be.visible');
  });

  it('Should show an error for a file exceeding the size limit', () => {
    cy.reload(); 
  
    cy.get('input[type="file"]', { timeout: 5000 })
      .should('exist')
      .and('be.visible')
      .as('fileInput'); 
  
    cy.get('@fileInput').attachFile('largeFile.pdf');
  
    cy.contains('O arquivo não pode exceder 500KB', { timeout: 20000 })
      .should('be.visible');
  });  

});
