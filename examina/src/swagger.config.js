import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Next.js project',
    },
  },
  apis: ['./src/app/api/**/*.js', './src/app/api/**/*.tsx'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
