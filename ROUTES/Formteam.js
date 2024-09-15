const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');



router.get("/teampage",(req, res) => {

    res.render('formteam');
 });

router.get('/teams',(req,res)=>{

    
    if (!req.session || !req.session.user || !req.session.user.id) {
        return res.status(404).send("USER NOT LOGGED IN");
    }

   

    const value =req.query.value;


    const sql = `SELECT name,skills,id FROM portfolio WHERE domain=?`;

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
module.exports=router;