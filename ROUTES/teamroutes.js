const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');

// Render the team creation page and get existing teams
router.get('/createteam', (req, res) => {
    const sql = 'SELECT * FROM Teams';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.render('teamcreation', { teams: results }); // Pass teams to the view
    });
});

// Create a new team
router.post('/createteam', (req, res) => {
    const { teamName, creatorName } = req.body;

    const sql = 'INSERT INTO Teams (team_name, creator_name) VALUES (?, ?)';
    db.query(sql, [teamName, creatorName], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.redirect('/formteam'); // Redirect after creating a team
    });
});

// Other routes...

module.exports = router;
