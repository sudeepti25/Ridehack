const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');

router.post('/sendrequest',(req, res)=>{

    const sender_id= req.session.user.user_id;
    const receiver_id= req.body.id;

    if(!sender_id)
    {
        return res.status(403).send('User not logged in');
        
    }

    const sql =`INSERT INTO Requests(sender_id,receiver_id) VALUES(?,?)`;

    db.query(sql,[sender_id,receiver_id], function(err,result){

        if(err)
        {
            return res.status(err).send("ERROR SENDING REQUEST");
        }

        console.log("request successfully sent");
        res.send("Request sent successfully");

    })

})


router.get('/showrequest',(req, res)=>{

    const id= req.session.user.user_id;

    sql=`SELECT *FROM Requests WHERE sender_id = ?`;
    db.query(sql,[id], function(err,result){

        if(err)
        {
            return res.status(err).send("ERROR FETCHING REQUESTS");
        }
        console.log(result);
        console.log("YOU HAVE RECIEVED A REQUEST FROM",result.sender_id);
        return res.send(result.sender_id);





    })
})

module.exports = router;
