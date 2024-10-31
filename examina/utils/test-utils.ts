// utils/test-utils.ts

import React from 'react';
import { mount } from 'cypress/react18';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import nextRouterMock from 'next-router-mock';

// If you have other providers like ThemeProvider, import them here
// import { ThemeProvider } from 'your-theme-library';
// import theme from 'path-to-your-theme';

type MountParams = Parameters<typeof mount>;
type Options = MountParams[1];

export function customMount(node: React.ReactElement, options?: Options) {
  return mount(
    <MemoryRouterProvider>
      {/* Wrap with other providers if needed */}
      {/* <ThemeProvider theme={theme}> */}
      {node}
      {/* </ThemeProvider> */}
    </MemoryRouterProvider>,
    options
  );
}

// Re-export everything from Cypress's mount
export * from 'cypress/react18';
