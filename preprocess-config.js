const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Path to the supergraph-config.yaml file
const configPath = path.join(process.cwd(), 'supergraph-config.yaml');
const outputPath = path.join(process.cwd(), 'supergraph-config-expanded.yaml');

// Read the supergraph-config.yaml file
let config = fs.readFileSync(configPath, 'utf8');

// Replace placeholders with environment variable values
config = config.replace(/\$\{PRICE_DGS_URL\}/g, process.env.PRICE_DGS_URL || '');
config = config.replace(/\$\{PRODUCT_DGS_URL\}/g, process.env.PRODUCT_DGS_URL || '');

// Write the expanded config to a new file
fs.writeFileSync(outputPath, config);

console.log(`Expanded config written to ${outputPath}`);