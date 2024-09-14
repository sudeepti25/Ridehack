const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');

// GET /organize to render the form
router.get('/organize', (req, res) => {
    res.render('organizehackathon');  // Render organizehackathon.ejs
});

// GET /findhackathon to render the search page
router.get('/findhackathon', (req, res) => {
    res.render('findhackathon');
});

// POST /organize to handle event registration
router.post('/organize', (req, res) => {
    const { eventName, organizationName, eventType, about, eventTopic, eventaddress, prize, eventEnquiriesEmail, websiteAddress, eventStartDate, eventEndDate, eventTheme } = req.body;

    const sql = 'INSERT INTO Events (eventName, organizationName, eventType, about, eventTopic, eventAddress, prize, eventEnquiriesEmail, websiteAddress, eventStartDate, eventEndDate, eventTheme) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [eventName, organizationName, eventType, about, eventTopic, eventaddress, prize, eventEnquiriesEmail, websiteAddress, eventStartDate, eventEndDate, eventTheme], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving event data!');
        }
        // Redirect to the newly created hackathon's detail page
        res.redirect(`/hackathon/${eventName}`);
    });
});

// GET /hackathon/:eventName to fetch and display hackathon details
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

        // Log the fetched hackathon data
        console.log("Fetched hackathon data: ", result[0]);

        // Pass the hackathon data to the EJS template
        res.render('hackathon', { hackathon: result[0] });
    });
});

module.exports = router;
