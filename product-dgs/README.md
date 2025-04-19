# Product Subgraph (product-dgs)

This subgraph is responsible for managing product-related data in the eShop application.

## Features
- Provides product details such as name and description.
- Federated with the supergraph gateway using Apollo Federation.

## Folder Structure
- `src/schema.graphql`: Defines the GraphQL schema for the subgraph.
- `src/index.ts`: Entry point for the subgraph server.
- `src/dataProvider.ts`: Contains mock data for products.

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the subgraph server:
   ```bash
   npm start
   ```
3. The server will run on `http://localhost:4002` by default.

## Federation
This subgraph uses Apollo Federation directives such as `@key` to integrate with the supergraph gateway.