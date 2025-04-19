# Price Subgraph (price-dgs)

This subgraph is responsible for managing price-related data in the eShop application.

## Features
- Provides price information for products.
- Federated with the supergraph gateway using Apollo Federation.

## Folder Structure
- `src/schema.graphql`: Defines the GraphQL schema for the subgraph.
- `src/index.ts`: Entry point for the subgraph server.
- `src/dataProvider.ts`: Contains mock data for prices.

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the subgraph server:
   ```bash
   npm start
   ```
3. The server will run on `http://localhost:4001` by default.

## Federation
This subgraph uses Apollo Federation directives such as `@key` and `@external` to integrate with the supergraph gateway.