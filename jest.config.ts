import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './', 
});

const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 
  testEnvironment: 'jest-environment-node', 
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(config);
