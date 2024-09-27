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

   const data = req.body.id;
   const user_id = req.body.user.user_id;

   console.log(data);

   if(!data)
   {
      return res.status(404).send("No data found");

   }



const sql =`INSERT INTO savedhacks (eventID,user_id) VALUES(?,?)`;

db.query(sql,[data,user_id],(err,result)=>{

     if(err)
     {
       return res.status(404).send("FAILED TO SAVE HACKATHON");
     }


     console.log("HACKATHON SUCCESFULLY SAVED!!");
})
})


router.get('/showsaved',(req,res)=>{


   const user_id=req.session.user.user_id;



   const sql=`SELECT*FROM events WHERE eventID =?`
   db.query(sql,[user_id],(err,result)=>{


      if(err)
      {
         return res.status(404).send("ERROR FETCHING");
      }


      if(!result)
      {
         return res.status(404).send("NO DATA FOUND");

      }
   
      console.log(result);


      res.render('savedhackathons',{data:result})




   })






})
module.exports=router;

