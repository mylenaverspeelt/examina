// cypress/component/Button.cy.tsx
import React from 'react';
import Button from '../../src/components/Button/Button'
import * as NextNavigation from 'next/navigation';

describe('Button Component', () => {
  beforeEach(() => {
    // Mock do useRouter e usePathname diretamente no Cypress
    cy.stub(NextNavigation, 'useRouter').returns({
      push: cy.stub(),
      prefetch: cy.stub(),
    });
    cy.stub(NextNavigation, 'usePathname').returns('/');
  });

  it('should render the button component', () => {
    cy.mount(<Button label="Test Button" variant="button" />);
    cy.get('button').contains('Test Button').should('be.visible');
  });
});
