// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import { expect, describe, it } from '@jest/globals';
// import RootLayout from '../layout';

// jest.mock('../../components/Navbar/Navbar', () => {
//   return function MockedNavbar() {
//     return <div data-testid="mocked-navbar">Navbar</div>;
//   };
// });

// jest.mock('../../components/Container/Container', () => {
//   return function MockedContainer({ children }: { children: React.ReactNode }) {
//     return <div data-testid="mocked-container">{children}</div>;
//   };
// });

// jest.mock('../../components/Button/Button', () => {
//   return function MockedButton({ label }: { label: string }) {
//     return <button data-testid="mocked-button">{label}</button>;
//   };
// });

// // describe('RootLayout', () => {
// //   const mockChildren = <div data-testid="mock-children">Test Content</div>;

// //   it('should render the RootLayout with all components and children', () => {
// //     document.documentElement.lang = 'pt-br';

// //     render(<RootLayout>{mockChildren}</RootLayout>);

// //     expect(screen.getByTestId('mocked-navbar')).toBeInTheDocument();
// //     expect(screen.getByTestId('mocked-container')).toBeInTheDocument();
// //     expect(screen.getByTestId('mock-children')).toBeInTheDocument();

// //     expect(document.documentElement).toHaveAttribute('lang', 'pt-br');
// //   });
// // });
