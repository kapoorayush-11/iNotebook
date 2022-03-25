// auths or notes mei jaa kar hum basically api ko banaa rhe.

const express = require('express');
const User = require('../models/User');
const router = express.Router();


// Create a user using : POST "/api/auth/". Doesn't require Auth (End point ke baare mei pata chal jaayega ki login chahiye isko  use krne ke liye ki nahi) 


router.post( '/',(req, res) =>  {
 console.log(req.body) // body mei jo likha vo terminal pe aayega;
const user = User(req.body); 
user.save() // WHatever we are writing on the body of thunderclient is getting saved on MongoDb compass.
 res.send(req.body);    //  Request going to thunderclient server, jo main screen mei show ho rhi.
})

 // Earlier we used get but get use karenge toh system ke logs mei detail share ho jaati. for eg password are something jo hum nahi chahte dikhe kissi ko, so better privacy option is post.
// req-request, res-response

module.exports = router