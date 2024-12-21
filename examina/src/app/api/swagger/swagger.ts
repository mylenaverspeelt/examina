import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API documentation for the Next.js project',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local server',
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/app/api/**/*.ts', './src/app/api/**/*.tsx'], 
};

const specs = swaggerJsdoc(swaggerOptions);

export default specs;
