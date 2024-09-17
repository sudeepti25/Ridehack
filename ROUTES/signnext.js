// Filename: signnext.js

const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');


// GET /signnext to render the form
router.get('/signnext', (req, res) => {
    res.render('signnext');  // Render the signnext.ejs form
});


// Handle Portfolio Form Submission

router.post('/signnext', (req, res) => {
    const { name, domain, college, projects, bio, skills, experience } = req.body;


    const userId = req.session.user ? req.session.user.id : null;

    if (!userId) {
        return res.status(403).send('User not logged in');
    }

    console.log({ name, domain, college, projects, bio, skills, experience });

    const sql = 'INSERT INTO portfolio (user_id, name, domain, college, projects, bio, skills, experience) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [userId, name, domain, college, projects, bio, skills, experience], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving portfolio data!');
        }
        

    });
    
    res.redirect('/landing_page');
});
// Filename: signnext.js

// Route to get user profile


// router.get('/profile', (req, res) => {
//     const userId = req.session.user ? req.session.user.id : null;

//     if (!userId) {
//         return res.status(403).send('User not logged in');
//     }

//     const sql = `SELECT u.domain, u.name, p.college, p.projects, p.bio, p.skills, p.experience
//                  FROM users u
//                  LEFT JOIN portfolio p ON u.id = p.user_id
//                  WHERE u.id = ?`;

//     db.query(sql, [userId], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Error fetching profile data!');
//         }

//         if (result.length === 0) {
//             return res.status(404).send('Profile not found!');
//         }

//         res.render('profile', { profile: result[0] }); // Render profile.ejs with user profile data
//     });
// });


// Route to display the user's portfolio (dynamic route)
router.get('/portfolio', (req, res) => {
   const id =req.query.id;
    
    // Fetch the user details from the database
    const sql = "SELECT * FROM portfolio WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching user details: ", err);
          return  res.status(500).send('Server error');
           
        }

        if (!result) {
            console.error("No user found with that name");
            return res.status(404).send('User not found');
            
        }


        console.log(result);

       
      return res.render('portfolio',{user:result[0]});
    });
});



module.exports = router;
