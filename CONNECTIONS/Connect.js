const mysql = require('mysql');
const express = require('express');

const connection = mysql.createConnection({
    host: '127.0.0.1',    // Corrected host
    port: 3306,           // Added port as a separate property
    user: 'root',
    password: 'sudeepti.25',
    database: "brainbridges"        
  });


  connection.connect(error => {
    if (error){
        console.log("An error has occurred while connecting to the database.");
        throw error;
    }

    else
    {
        console.log("Database connection established successfully.");
    }

  });

  module.exports = connection;