import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Worki-2 Backend API',
      version: '1.0.0',
      description: 'API documentation for Worki-2 Backend',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Comment: {
          type: 'object',
          required: ['userImage', 'nickname', 'content', 'postName'],
          properties: {
            userImage: {
              type: 'string',
              description: 'URL of the user\'s profile image',
            },
            nickname: {
              type: 'string',
              description: 'Nickname of the comment author',
            },
            content: {
              type: 'string',
              description: 'Content of the comment',
            },
            postName: {
              type: 'string',
              description: 'Identifier of the post this comment belongs to',
            },
          },
          example: {
            userImage: 'https://example.com/profile.jpg',
            nickname: 'user123',
            content: 'This is a sample comment',
            postName: 'sample-post'
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', 
    swaggerUi.serve, 
    swaggerUi.setup(specs, { explorer: true })
  );
  console.log('📚 Swagger docs available at /api-docs');
};

export default setupSwagger;
