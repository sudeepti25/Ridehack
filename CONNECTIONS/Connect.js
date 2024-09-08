// Filename: Connect.js

const mysql = require('mysql');

// Create a pool of connections
const pool = mysql.createPool({
    connectionLimit: 10, // Number of connections to maintain in the pool
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'sudeepti.25',
    database: 'brainbridges'
});

// Export the pool
module.exports = pool;