const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');



router.get("/teampage",(req, res) => {

    res.render('formteam');
 });

router.get('/teams',(req,res)=>{

    
    if (!req.session || !req.session.user || !req.session.user.user_id ){
        return res.status(404).send("USER NOT LOGGED IN");
    }

   

    const value =req.query.value;


    const sql = `SELECT skills,user_id FROM portfolio WHERE domain=?`;

    db.query(sql,[value],(err,result)=>{

        if(err)
        {
            return res.status(500).send("ERROR FECTHING");

        }

        if(!result)
        {
            return res.status(404).send("PEOPLE NOT FOUND");
        }

       

       

        res.render('formteams1',{people:result});

})

    



})

router.post('/filter-users', (req, res) => {
    const { skills, languages, college } = req.body;

    // Construct SQL query based on the selected filters
    let query = `
        SELECT portfolio.skills, portfolio.college 
        FROM portfolio 
        WHERE 1=1`;

    let queryParams = [];

    // Add filters dynamically to the query
    if (skills.length > 0) {
        query += " AND portfolio.skills IN (?)";
        queryParams.push(skills);
    }
    if (languages.length > 0) {
        query += " AND portfolio.skills LIKE ?";
        queryParams.push(`%${languages}%`);  // Assuming languages are stored within skills as a string
    }
    if (college.length > 0) {
        query += " AND portfolio.college IN (?)";
        queryParams.push(college);
    }

    // Execute the query
    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching users');
        } else {
            res.json(results); // Send the filtered users back to the frontend
        }
    });
});

module.exports=router;