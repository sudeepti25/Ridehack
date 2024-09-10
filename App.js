// Filename: app.js

const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./CONNECTIONS/Connect'); // Database connection
const loginSignupRoutes = require('./ROUTES/Login-signup'); // Routes for login/signup
const signnextRoutes = require('./ROUTES/signnext'); // Updated route import
const organizeHackathonRoutes = require('./ROUTES/organizehackathon'); // Import the organizehackathon routes
const formteamsroutes = require('./ROUTES/Formteam'); // Import the organizehackathon routes


const app = express();
const PORT = 5000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './VIEWS/views'));
app.use(express.static(path.join(__dirname, './VIEWS/views')));
// Session setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set `secure: true` if using HTTPS
}));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Use the login/signup routes
app.use('/', loginSignupRoutes);

// Use the signnext routes
app.use('/', signnextRoutes);

// Use the organizehackathon routes
app.use('/', organizeHackathonRoutes);
app.use('/', formteamsroutes);

// LANDING PAGE ROUTE
app.get('/findhackathon', (req, res) => {
    res.render('findhackathon');
});

// Test database connection route
app.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            res.status(500).send('Database connection failed');
        } else {
            res.send('Database connection successful! Result: ' + results[0].solution);
        }
    });
});

// Start the server 
app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});
