// Filename: Login-signup.js

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../CONNECTIONS/Connect'); // Importing the connection pool



routes.get('/landing_page',(req, res) => {


    res.render('landing_page'); 
})

// Handle Signup
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error during signup!');
        }
        res.send('Signup successful! You can now login.');
    });


    res.redirect('/landing_page');

    
});

// Handle Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error during login!');
        }

        if (result.length === 0) {
            return res.status(404).send('User not found!');
        }

        const user = result[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Incorrect password!');
        }

        // Example: Store user data in session or another mechanism for subsequent requests
        req.session.user = user; // Assuming you have session middleware set up

        res.send('Login successful!');
    });
});
router.get('/login', (req, res) => {
    res.render('login'); // Render login.ejs
});


// Serve signup page
router.get('/signup', (req, res) => {
    res.render('signpage'); // Render signpage.ejs
});
// Test route to check database connection
router.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            res.status(500).send('Database connection failed');
        } else {
            res.send('Database connection successful! Result: ' + results[0].solution);
        }
    });
});

module.exports = router;
