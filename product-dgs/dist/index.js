"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const subgraph_1 = require("@apollo/subgraph");
const dataProvider_1 = require("./dataProvider");
const load_files_1 = require("@graphql-tools/load-files");
const path_1 = require("path");
const typeDefs = (0, load_files_1.loadFilesSync)((0, path_1.join)(__dirname, 'schema.graphql'));
const resolvers = {
    Query: {
        products: () => (0, dataProvider_1.getProducts)(),
        productById: (_, { id }) => (0, dataProvider_1.getProducts)().find(product => product.id === id),
    },
    Product: {
        __resolveReference(product) {
            return (0, dataProvider_1.getProducts)().find(p => p.id === product.id);
        },
        price: (product) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const query = `{ priceByProduct(productId: \"${product.id}\") { price } }`;
                console.log('Sending query to price-dgs:', query);
                const response = yield fetch('http://localhost:4001', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query })
                });
                const result = yield response.json();
                console.log('Response from price-dgs:', JSON.stringify(result, null, 2));
                if (result.errors) {
                    console.error('Errors from price-dgs:', result.errors);
                    return null;
                }
                const price = result.data.priceByProduct.price;
                console.log('Returning price from resolver:', price);
                return price;
            }
            catch (error) {
                console.error('Error fetching price from price-dgs:', error);
                return null;
            }
        })
    },
};
const schema = (0, subgraph_1.buildSubgraphSchema)({ typeDefs, resolvers });
const server = new apollo_server_1.ApolloServer({
    schema,
});
server.listen({ port: 4002 }).then(({ url }) => {
    console.log(`Product DGS running at ${url}`);
});
