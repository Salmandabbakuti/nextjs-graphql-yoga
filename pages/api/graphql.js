import 'event-target-polyfill';
import { createServer, createPubSub } from '@graphql-yoga/node';

const pubsub = createPubSub();

const server = createServer({
  schema: {
    typeDefs: `
      type Query {
        hello: String
      }
      type Mutation {
        hello: String
      }
      type Subscription {
        notification: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hello from Yoga!',
      },
      Mutation: {
        hello: () => {
          pubsub.publish('notification', `Hello GraphQL Subscription.Time: ${new Date()}`);
          return 'Hello from Yoga!';
        },
      },
      Subscription: {
        notification: {
          subscribe: () => pubsub.subscribe('notification'),
          resolve: (payload) => payload
        }
      }
    }
  },
  endpoint: '/api/graphql'
});

// server.start();
export default server;