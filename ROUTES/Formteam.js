const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');

// Route to render team page
router.get("/teampage", (req, res) => {
    res.render('formteam');
});

// Route to fetch teams based on domain
router.get('/teams', (req, res) => {

    if (!req.session || !req.session.user || !req.session.user.user_id) {
        return res.redirect('/login');
    }

    const value = req.query.value;

    // SQL query to join users table and fetch name, skills, and user_id
    const sql = `
        SELECT u.name, p.skills, p.user_id 
        FROM portfolio p 
        JOIN users u ON p.user_id = u.user_id 
        WHERE p.domain = ?`;

    db.query(sql, [value], (err, result) => {
        if (err) {
            return res.status(500).send("ERROR FETCHING");
        }

        if (!result || result.length === 0) {
            return res.status(404).send("PEOPLE NOT FOUND");
        }

        

        res.render('formteams1', { people: result});
    });

});

// Route to filter users based on skills, languages, and college
// Route to filter users based on skills, languages, year, and college
router.post('/filter-users', (req, res) => {
    const { skills, languages, college, year } = req.body;

    // Construct SQL query with dynamic filters
    let query = `
        SELECT u.name, p.skills, p.college, p.year 
        FROM portfolio p 
        JOIN users u ON p.user_id = u.user_id 
        WHERE 1=1`;

    let queryParams = [];

    // Filter by skills (using FIND_IN_SET for comma-separated values)
    if (skills && skills.length > 0) {
        query += " AND FIND_IN_SET(?, p.skills)";
        queryParams.push(skills); // Match specific skill in comma-separated skills
    }

    // Filter by languages (assuming languages are stored as part of skills or separately)
    if (languages && languages.length > 0) {
        query += " AND FIND_IN_SET(?, p.skills)"; // Adjust if languages are stored separately
        queryParams.push(languages);  // Match specific language
    }

    // Filter by year
    if (year && year.length > 0) {
        query += " AND p.year = ?";
        queryParams.push(year);
    }

    // Filter by college
    if (college && college.length > 0) {
        query += " AND p.college = ?";
        queryParams.push(college);  // Exact match for college
    }

    // Execute the query
    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching users');
        }

        res.json(results); // Send the filtered users back to the frontend
    });
});

module.exports = router;
