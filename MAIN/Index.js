// Filename - app.js 

// Importing modules
const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 5000;

// Create a connection to the database
const connection = mysql.createConnection({
  host: '127.0.0.1',    // Corrected host
  port: 3306,           // Added port as a separate property
  user: 'root',
  password: 'sudeepti.25',
  database: "brainbridges"        
});

// Open the MySQL connection
connection.connect(error => {
    if (error){
        console.log("An error has occurred while connecting to the database.");
        throw error;
    }
    
    // If everything goes well, start Express Server
    app.listen(PORT, ()=>{
        console.log("Database connection is ready and "
             + "Server is listening on port", PORT);
    });
});
