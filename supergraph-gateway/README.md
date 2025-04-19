# Supergraph Gateway

The supergraph gateway is responsible for federating the `price-dgs` and `product-dgs` subgraphs into a unified GraphQL API.

## Features
- Combines schemas from multiple subgraphs using Apollo Federation.
- Serves as the entry point for the eShop GraphQL API.

## Folder Structure
- `supergraph.graphql`: The composed schema for the supergraph.
- `index.ts`: Entry point for the gateway server.
- `supergraph-config.yaml`: Configuration file for composing the supergraph schema.
- `preprocess-config.js`: Script to preprocess the supergraph configuration.

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Compose the supergraph schema (run this command from the root directory):
   ```bash
   npm run compose-supergraph
   ```
3. Start the gateway server:
   ```bash
   npm start
   ```
4. The server will run on `http://localhost:4000` by default.

## Federation
The gateway dynamically fetches schemas from the subgraphs or uses a pre-composed schema (`supergraph.graphql`).