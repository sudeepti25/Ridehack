// teamroutes.js
const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');

// Render the "Create Team" page
router.get('/create', (req, res) => {
    res.render('createTeam'); // Render the EJS file for creating a team
});

// Handle POST request to create a team
router.post('/create', (req, res) => {
    const { teamName } = req.body; // Extracting teamName from req.body
    const leaderId = req.session.user.user_id; // Assuming the logged-in user's ID is stored in session
    console.log(leaderId);
    console.log(teamName);

    if (!teamName || !leaderId) {
        return res.status(400).send('Team name and leader information are required.');
    }

    const sql = 'INSERT INTO teams (team_name, leader_id) VALUES (?, ?)';
    db.query(sql, [teamName, leaderId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }

        const teamId = results.insertId; // Get the newly created team_id
        console.log('Team created successfully with ID:', results.insertId);
        res.redirect('/showteams'); // Redirect to the list of teams after successful creation
    });
});

// Render the list of existing teams with leader information
router.get('/showteams', (req, res) => { // Corrected the route name
    const sql = `
        SELECT teams.team_id, teams.team_name, users.name AS leader_name
        FROM teams
        JOIN users ON teams.leader_id = users.user_id
    `;
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }

        res.render('showteams', { teams: results }); // Pass the teams to the EJS view
    });
});
// Handle POST request to select a team
router.post('/selectteam', (req, res) => {
    const { teamId } = req.body;

    // Store the selected team ID in session for later use
    req.session.selectedTeamId = teamId;
const Id=req.session.selectedTeamId 
console.log(Id);
    // Redirect to the next page where the request will be sent
    res.redirect(`/teampage?teamId=${Id}`);  // This will be the page where users will send the join request
});

module.exports = router;
