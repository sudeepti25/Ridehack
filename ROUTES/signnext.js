// Filename: signnext.js

const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');

// GET /signnext to render the form
router.get('/signnext', (req, res) => {
    res.render('signnext');  // Render the signnext.ejs form
});

// Handle Portfolio Form Submission
// router.post('/signnext', (req, res) => {
//     const {year, domain, college, projects, bio, skills, experience } = req.body;

//     const userId = req.session.user ? req.session.user.user_id : null;

//     if (!userId) {
//         return res.status(403).send('User not logged in');
//     }

//     console.log({year, domain, college, projects, bio, skills, experience });

//     // Fix: Correct the number of placeholders to match the fields being inserted
//     const sql = 'INSERT INTO portfolio (user_id, domain, skills, college, projects, bio, experience,year) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
    
//     db.query(sql, [userId,year, domain, college, projects, bio, skills, experience], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Error saving portfolio data!');
//         }
        
//         // Redirect only after the database operation is complete
//         res.redirect('/landing_page');
        
//     });
// });
router.post('/signnext', (req, res) => {
    const { year, domain, college, projects, bio, skills, experience } = req.body;

    const userId = req.session.user ? req.session.user.user_id : null;

    if (!userId) {
        return res.status(403).send('User not logged in');
    }

    console.log({ year, domain, college, projects, bio, skills, experience });

    // Correct SQL query with matching order of placeholders and values
    const sql = 'INSERT INTO portfolio (user_id, domain, skills, college, projects, bio, experience, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(sql, [userId, domain, skills, college, projects, bio, experience, year], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving portfolio data!');
        }

        // Redirect only after the database operation is complete
        res.redirect('/landing_page');
    });
});

// Route to display the user's portfolio (dynamic route)
router.get('/portfolio', (req, res) => {
    const id = req.query.id; // Get the user ID from query parameters

    if (!id) {
        return res.status(400).send('User ID is required');
    }

    // Fetch the user details from the database
    const sql = `
        SELECT u.name,u.email, p.domain, p.college, p.projects, p.bio, p.skills, p.experience
        FROM users u
        JOIN portfolio p ON u.user_id = p.user_id
        WHERE u.user_id = ?`;
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching user details: ", err);
            return res.status(500).send('Server error');
        }

        if (!result || result.length === 0) {
            console.error("No user found with that ID");
            return res.status(404).send('User not found');
        }

        console.log(result);
        return res.render('portfolio', { user: result[0] });
    });
});

router.get('/myprofile', (req, res) => {
    const id = req.session.user.user_id; // Get the user ID from query parameters

    if (!id) {
        return res.status(400).send('User ID is required');
    }

    // Fetch the user details from the database
    const sql = `
        SELECT u.name,u.email, p.domain, p.college, p.projects, p.bio, p.skills, p.experience
        FROM users u
        JOIN portfolio p ON u.user_id = p.user_id
        WHERE u.user_id = ?`;
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching user details: ", err);
            return res.status(500).send('Server error');
        }

        if (!result || result.length === 0) {
            console.error("No user found with that ID");
            return res.status(404).send('User not found');
        }

        console.log(result);
        return res.render('myprofile', { user: result[0] });
    });
});

module.exports = router;
