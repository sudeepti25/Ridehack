// Filename: app.js

const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const bodyparser = require('body-parser');
const db = require('./CONNECTIONS/Connect'); // Database connection
const loginSignupRoutes = require('./ROUTES/Login-signup'); // Routes for login/signup
const signnextRoutes = require('./ROUTES/signnext'); // Updated route import
const organizeHackathonRoutes = require('./ROUTES/organizehackathon'); // Import the organizehackathon routes
const formteamsroutes = require('./ROUTES/Formteam'); // Import the organizehackathon routes


const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './VIEWS/views'));
app.use(express.static(path.join(__dirname, './VIEWS/views')));
// Session setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set `secure: true` if using HTTPS
}));

// Middleware to parse form data
app.use(bodyparser.urlencoded({ extended: true }));

// Use the login/signup routes
 app.use('/', loginSignupRoutes);

// Use the signnext routes
app.use('/', signnextRoutes);

// Use the organizehackathon routes
app.use('/', organizeHackathonRoutes);
app.use('/', formteamsroutes);


// LANDING PAGE ROUTE
app.get('/findhackathon', (req, res) => {
    res.render('findhackathon');
});

// Test database connection route
app.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            res.status(500).send('Database connection failed');
        } else {
            res.send('Database connection successful! Result: ' + results[0].solution);
        }
    });
});




app.get('/landing_page', (req,res)=>{
    res.render('landing_page'); 
})

app.get('/portfolio', (req,res)=>{

    // const user = {
    //     name: 'Vidit Tamrakar',
    //     domain: 'full stack development',
    //     college: 'JUET GUNA',
    //     projects: 'scriptbox.cloud',
    //     bio: "I'm a full stack web developer.",
    //     skills: 'React.js , Node.js , Next.js, Docker , kubernetes , Distributed System, AWS.',
    //     experience: '2'
    //   }
    // res.render('portfolio', {user}); 
    const username = req.query.username; // Get username from the query parameters (e.g., /portfolio?username=vidit)

    if (!username) {
        return res.status(400).send('No username provided');
    }

    // Query the database to get the user's portfolio data by username
    const sql = 'SELECT name, domain, college, projects, bio, skills, experience FROM portfolio WHERE name = ?';
    // const sql = `
    // SELECT 
    //     portfolio.name, portfolio.domain, portfolio.college, portfolio.projects, 
    //     portfolio.bio, portfolio.skills, portfolio.experience, users.email 
    // FROM 
    //     portfolio 
    // JOIN 
    //     users 
    // ON 
    //     portfolio.name = users.name 
    // WHERE 
    //     portfolio.name = ?`;
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).send('Error fetching portfolio data');
        }

        if (result.length === 0) {
            return res.status(404).send('Portfolio not found for this user');
        }

        // Extract the user's data
        const user = result[0];

        // Render the portfolio.ejs page with the user data
        res.render('portfolio', { user });
    });
});


// Start the server 
app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});
