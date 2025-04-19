
import { buildSubgraphSchema } from '@apollo/subgraph';
import { loadFilesSync } from '@graphql-tools/load-files';
import { getPrices } from './dataProvider';
import { join } from 'path';
import { ApolloServer } from 'apollo-server';

const typeDefs = loadFilesSync(join(__dirname, 'schema.graphql'));

const resolvers = {
  Query: {
    prices: () => getPrices(),
    priceByProduct: (_: any, { productId }: { productId: string }) => {
      const priceEntry = getPrices().find(price => price.productId === productId);
      if (!priceEntry) {
        console.warn(`No price found for productId: ${productId}`);
        return { price: null };
      }
      return priceEntry;
    }
  },
  Price: {
    __resolveReference(price: { id: string }) {
      return getPrices().find(p => p.id === price.id);
    },
  },
  Product: {
    price: (product: { id: string }) => {
      const priceEntry = getPrices().find(price => price.productId === product.id);
      return priceEntry ? priceEntry.price : null;
    }
  }
};

const schema = buildSubgraphSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,

});


server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Pricing DGS running at ${url}`);
});