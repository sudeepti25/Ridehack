const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../CONNECTIONS/Connect'); // Importing the connection pool




// LANDING PAGE ROUTE
router.get('/landing_page', (req, res) => {
    const user = req.session.user;
    res.render('landing_page', { user });
});

// Serve signup page
router.get('/signup', (req, res) => {
    res.render('signpage',{error:null}); // Render signpage.ejs
});

// Handle Signup
router.post('/signup', (req, res) => {
    const { name, email, password,id } = req.body; // Extracts form data

    if (!name || !email || !password) { 
        return res.status(400).send('All fields are required!');
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {

         return res.render('signpage',{error:1}); // Render signpage.ej
          
        }

        // Fetch the newly created user from the database to store in the session
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
            if (err || result.length === 0) {
                console.error(err);
                return res.status(500).send('Error retrieving user data!');
            }

            // Store user data in session
            const user = result[0];
            req.session.user = user;

           res.render('redirection');
        });
    });
});

// Serve login page
router.get('/login', (req, res) => {
    res.render('login',{error:null}); // Render login.ejs
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

        if (!result) {
            return res.render('login',{error:1});
        }

        const user = result[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.render('login',{error:1});
        }

        // Store user data in session
        req.session.user = user;


        
           
        



        
        res.redirect('/landing_page');
    });
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

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out!');
        }
        res.redirect('/landing_page');
    });
});
module.exports = router;
