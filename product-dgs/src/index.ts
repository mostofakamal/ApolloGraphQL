import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { getProducts } from './dataProvider';
import { loadFilesSync } from '@graphql-tools/load-files';
import { join } from 'path';

const typeDefs = loadFilesSync(join(__dirname, 'schema.graphql'));
const resolvers = {
  Query: {
    products: () => getProducts(),
    productById: (_: any, { id }: { id: string }) => getProducts().find(product => product.id === id),
  },
  Product: {
    __resolveReference(product: { id: string }) {
      return getProducts().find(p => p.id === product.id);
    },
  },
};

const schema = buildSubgraphSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`Product DGS running at ${url}`);
});