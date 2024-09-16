// Filename - app.js 

// Importing modules
const express = require('express');
const mysql = require('mysql');
const db=require('../CONNECTIONS/Connect')

const app = express();
const PORT = 5000;












    app.listen(PORT, ()=>{
        console.log(
     "Server is listening on port", PORT);
    });
