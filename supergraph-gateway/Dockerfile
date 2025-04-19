# Use an official Node.js runtime as a parent image
FROM node:16 AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy source files
COPY . .

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["npx", "ts-node", "index.ts"]