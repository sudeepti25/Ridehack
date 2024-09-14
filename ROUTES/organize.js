// Filename: organizehackathon.js

const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');

// GET /organizehackathon to render the form
router.get('/organize', (req, res) => {
    res.render('organizehackathon');  // Render organizehackathon.ejs
});
router.get('/findhackathon', (req, res) => {
    res.render('findhackathon'); // Render signpage.ejs
});
router.get('/hackathon', (req, res) => {
    res.render('hackathon');  // Render organizehackathon.ejs
});

// Handle Event Registration Form Submission
router.post('/organize', (req, res) => {
    const { eventName, organizationName, eventType, about, eventTopic, eventaddress, prize, eventEnquiriesEmail, websiteAddress, eventStartDate, eventEndDate, eventTheme } = req.body;

    const sql = 'INSERT INTO Events (eventName, organizationName, eventType, about, eventTopic, eventAddress, prize, eventEnquiriesEmail, websiteAddress, eventStartDate, eventEndDate, eventTheme) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [eventName, organizationName, eventType, about, eventTopic, eventaddress, prize, eventEnquiriesEmail, websiteAddress, eventStartDate, eventEndDate, eventTheme], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving event data!');
        }
        res.redirect('/hackathon');
    });
    
});
// GET /findhackathon to fetch and display event data
// Search hackathon by name and display its details
router.get('/hackathon/:eventName', (req, res) => {
    const eventName = req.params.eventName;

    // Fetch hackathon details from the database
    const sql = "SELECT * FROM Events WHERE eventName = ?";
    db.query(sql, [eventName], (err, result) => {
        if (err) {
            console.error("Error fetching hackathon details: ", err);
            return res.status(500).send('Server error');
        }

        if (result.length === 0) {
            console.error("No hackathon found with that name");
            return res.status(404).send('Hackathon not found');
        }

        // Log the fetched hackathon data to ensure we got it
        console.log("Fetched hackathon data: ", result[0]);

        // Pass the hackathon data to the EJS template
        res.render('hackathon', { hackathon: result[0] });
    });

});

module.exports = router;
module.exports = router;
