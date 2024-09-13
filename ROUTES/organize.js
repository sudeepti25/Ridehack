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

// Handle Event Registration Form Submission
router.post('/organize', (req, res) => {
    const { eventName, organizationName, eventType, eventCategory, eventTopic, eventaddress, contactPerson, eventEnquiriesEmail, websiteAddress, eventStartDate, eventEndDate, eventTheme } = req.body;

    const sql = 'INSERT INTO Events (eventName, organizationName, eventType, eventCategory, eventTopic, eventAddress, contactPerson, eventEnquiriesEmail, websiteAddress, eventStartDate, eventEndDate, eventTheme) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [eventName, organizationName, eventType, eventCategory, eventTopic, eventaddress, contactPerson, eventEnquiriesEmail, websiteAddress, eventStartDate, eventEndDate, eventTheme], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving event data!');
        }
        res.redirect('/findhackathon');
    });
    
});

module.exports = router;
