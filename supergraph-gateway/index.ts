const { ApolloGateway } = require('@apollo/gateway');
const { ApolloServer } = require('apollo-server');
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
const { readFileSync } = require('fs');
const { join } = require('path');

const supergraphSdl = readFileSync(join(__dirname, 'supergraph.graphql'), 'utf8');

const gateway = new ApolloGateway({
  supergraphSdl,
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  formatError: (error: any) => {
    console.error('GraphQL Error:', error);
    return error;
  },
});

server.listen({ port: 4000 }).then(({ url }: { url: string }) => {
  console.log(`Supergraph Gateway running at ${url}`);
});