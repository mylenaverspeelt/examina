import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import  Home  from "../src/app/page"

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  })),
  usePathname: jest.fn(() => '/')
}));

describe('Home Page Happy Paths', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });
  
  test('renders home page component', () => {
    render(<Home />);
    expect(screen.getByText('Adicionar um novo exame')).toBeInTheDocument();
  });

  test('render search bar', () => {
    render(<Home />);
    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();
  });

  test('renders all navigation buttons', () => {
    render(<Home />);
    const addExamButton = screen.getByText('Adicionar um novo exame');
    const viewExamsButton = screen.getByText('Ver exames armazenados');
    const analyticsButton = screen.getByText('Gerar Gráficos e Relatórios');

    expect(addExamButton).toBeInTheDocument();
    expect(viewExamsButton).toBeInTheDocument();
    expect(analyticsButton).toBeInTheDocument();
  });

  test('check if buttons have correct href attributes', () => {
    render(<Home />);
    const addExamLink = screen.getByText('Adicionar um novo exame').closest('a');
    const viewExamsLink = screen.getByText('Ver exames armazenados').closest('a');
    const analyticsLink = screen.getByText('Gerar Gráficos e Relatórios').closest('a');

    expect(addExamLink).toHaveAttribute('href', '/new');
    expect(viewExamsLink).toHaveAttribute('href', '/uploads');
    expect(analyticsLink).toHaveAttribute('href', '/analytics');
  });

  test('renders FontAwesome icons', () => {
    render(<Home />);
    const icons = document.querySelectorAll('.svg-inline--fa');
    expect(icons).toHaveLength(4);
  });

});

describe('Home Page Sad Path', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });
  
  test('page rendering failure', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); 
    expect(() => render(<Home />)).not.toThrow();
  });
  
});