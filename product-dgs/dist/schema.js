"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
  type Product @key(fields: "id") {
    id: ID!
    name: String!
    description: String!
    price: Price
  }

  type Price {
    price: Float!
  }

  type Query {
    products: [Product]
    productById(id: ID!): Product
  }
`;
exports.default = typeDefs;
