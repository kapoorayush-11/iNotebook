const express = require('express');
const User = require('../models/User');
const router = express.Router();


// Create a user using : POST "/api/auth/". Doesn't require Auth
router.post( '/', (req, res) => { // Earlier we used get but get use karenge toh system ke logs mei detail share ho jaati. for eg password are something jo hum nahi chahte dikhe kissi ko, so better privacy option is post.
                                     // req-request, res-response
    console.log(req.body); // Request is going to terminal.
    const user = User(req.body); 
    user.save() // WHatever we are writing on the body of thunderclient is getting saved on MongoDb compass.
    res.send(req.body); //  Request going to thunderclient server.
})

module.exports = router