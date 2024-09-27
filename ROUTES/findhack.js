const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');


router.get('/findhack',(req,res) => {

    const sql=`SELECT *FROM events`;

    db.query(sql,(err,result) => {

         if(err)
         {
            return res.status(404).send("FAILED TO FETCH HACKATHONS");
         }

         if(!result)
         {
            return res.status(404).send("NO HACKATHONS FOUND");
         }

      


      return res.render('findhackathon',{data:result});
 })

   


})


router.post('/savehacks', (req, res) => {

const sql =`INSERT INTO savehacks VALUES()`







})




module.exports=router;