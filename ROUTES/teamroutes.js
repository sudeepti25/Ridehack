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
       
        res.redirect('/showteams'); // Redirect to the list of teams after successful creation
    });
});

// Render the list of existing teams with leader and member information
// Render the list of existing teams with leader and team members information
router.get('/showteams', (req, res) => {
    const sql = `
        SELECT 
            t.team_id, 
            t.team_name, 
            u.name AS leader_name,
            um.user_id AS member_id,
            um.name AS member_name
        FROM teams t
        JOIN users u ON t.leader_id = u.user_id
        LEFT JOIN team_members tm ON t.team_id = tm.team_id
        LEFT JOIN users um ON tm.user_id = um.user_id
    `;

    db.query(sql, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }

        // Process the results to group team members by team
        const teams = results.reduce((acc, row) => {
            // Find the team in the accumulator
            let team = acc.find(t => t.team_id === row.team_id);

            if (!team) {
                // If team doesn't exist in the accumulator, create a new entry
                team = {
                    team_id: row.team_id,
                    team_name: row.team_name,
                    leader_name: row.leader_name,
                    members: []
                };
                acc.push(team);
            }

            // If there is a member for the team, add the member to the members array
            if (row.member_id) {
                team.members.push({
                    user_id: row.member_id,
                    name: row.member_name
                });
            }

            return acc;
        }, []);

        // Render the showteams page and pass the teams and their members
        res.render('showteams', { teams });
    });
});

// Handle POST request to select a team
router.post('/selectteam', (req, res) => {
    const { teamId } = req.body;

    // Store the selected team ID in session for later use
    req.session.selectedTeamId = teamId;
    const selectedTeamId = req.session.selectedTeamId;

    // Redirect to the next page where the request will be sent
    res.redirect(`/teampage`);  // Redirect to the team page to send join request
});

module.exports = router;
