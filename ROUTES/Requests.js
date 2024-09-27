const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');

router.post('/sendrequest',(req, res)=>{

    const sender_id= req.session.user.user_id;
    const team_id= req.session.selectedTeamId;
    const receiver_id= req.body.id;

    if(!sender_id)
    {
        return res.status(403).send('User not logged in');
        
    }

    const sql =`INSERT INTO Requests(sender_id,receiver_id,team_id) VALUES(?,?,?)`;

    db.query(sql,[sender_id,receiver_id,team_id], function(err,result){

        if(err)
        {
            return res.status(err).send("ERROR SENDING REQUEST");
        }

       

    })

})


router.get('/showrequest',(req, res)=>{

   
    
    if (!req.session || !req.session.user || !req.session.user.user_id) {
        return res.redirect('/login');
    }

    const id= req.session.user.user_id;



    sql=`SELECT *FROM Requests WHERE receiver_id = ? AND status="pending"`;
    db.query(sql,[id], async function(err,result){

        if(err)
        {
            return res.status(err).send("ERROR FETCHING REQUESTS");
        }
        


    for (let request of result) {
            const nameSql = 'SELECT u.name, t.team_name from Users u JOIN Teams t ON u.user_id=t.leader_id WHERE u.user_id=?';
            await new Promise((resolve, reject) => {
                db.query(nameSql, [request.sender_id], (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    if (rows.length > 0) {
                        request.sender_name = rows[0].name; // Add name to the request object
                        request.team_name = rows[0].team_name; // Add team name to the request object
                    } else {
                        request.sender_name = 'Unknown'; // In case no user is found
                    }
                    resolve();
                });
            });
        }


          
        

        return res.render('requespage',{sender:result});



    })
})


router.post('/response', (req, res) =>{

    const{sender_id,receiver_id,action}=req.body;

    const sql= `UPDATE Requests SET status=? WHERE sender_id=? AND receiver_id=?`;

    db.query(sql,[action,sender_id,receiver_id], function(err,result){


        if(err)
            {
                return res.status(err).send("ERROR SENDING REQUEST");
            }
    
            console.log("request successfully sent");
            
    




    })

})

module.exports = router;
