const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');



router.get('/teams',(req,res)=>{

    const userid= req.session.user.id;
    const value =req.query.value;

    if(!userid)
    {
        res.status(404).send("USER NOT LOGGED IN");
    }

    const sql = `SELECT name,skills FROM portfolio WHERE skills=?`;

    db.query(sql,[],(err,result)=>{

        if(err)
        {
            res.status(500).send("ERROR FECTHING");

        }

        if(result.length===0)
        {
            res.status(404).send("PEOPLE NOT FOUND");
        }


        res.render('formteams1',{people:result});

})

    



})
module.exports=router;