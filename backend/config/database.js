// Import the 'pg' package we installed
const { Pool } = require('pg');

// Import dotenv to load environment variables from .env file
require('dotenv').config();

// Create a connection pool
// Pool = reuse connections instead of creating new ones
const pool = new Pool({
    user: process.env.DB_USER,           // From .env
    password: process.env.DB_PASSWORD,   // From .env
    host: process.env.DB_HOST,           // From .env
    port: process.env.DB_PORT,           // From .env
    database: process.env.DB_NAME,       // From .env
});

// Test the connection
pool.on('connect', () => {
    console.log('✓ Connected to PostgreSQL');
});

// Handle connection errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

// Export pool so other files can use it
module.exports = pool;