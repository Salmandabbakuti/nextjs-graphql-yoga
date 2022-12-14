import { createServer } from '@graphql-yoga/node';

const server = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hello from Yoga!',
      },
    },
  },
  endpoint: '/api/graphql'
});

// server.start();
export default server;