import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './', 
});

const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 
  testEnvironment: 'jest-environment-node', 
};

export default createJestConfig(config);
