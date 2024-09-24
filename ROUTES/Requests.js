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
    console.log(id);

    sql=`SELECT *FROM Requests WHERE receiver_id = ? AND status="pending"`;
    db.query(sql,[id], async function(err,result){

        if(err)
        {
            return res.status(err).send("ERROR FETCHING REQUESTS");
        }
        


        


        for (let request of result) {
            const nameSql = 'SELECT name FROM Users WHERE user_id = ?';
            await new Promise((resolve, reject) => {
                db.query(nameSql, [request.sender_id], (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    if (rows.length > 0) {
                        request.sender_name = rows[0].name; // Add name to the request object
                    } else {
                        request.sender_name = 'Unknown'; // In case no user is found
                    }
                    resolve();
                });
            });
        }


          console.log(result);
        

        return res.render('requespage',{sender:result});












    })
})

module.exports = router;
