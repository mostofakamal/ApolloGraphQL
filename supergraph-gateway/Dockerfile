# Build stage
FROM node:16 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Runtime stage
FROM node:16-slim AS runtime
WORKDIR /app

# Copy source files and dependencies
COPY --from=build /app .

# Expose the application port
EXPOSE 4000

# Start the application using ts-node
CMD ["npx", "ts-node", "index.ts"]