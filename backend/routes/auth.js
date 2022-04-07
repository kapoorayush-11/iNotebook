// auths or notes mei jaa kar hum basically api ko banaa rhe.

const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Create a user using : POST "/api/auth/createuser". Doesn't require Authorization (End point ke baare mei pata chal jaayega ki login chahiye isko  use krne ke liye ki nahi) 


router.post( '/createuser',[
  // If there are errors, return bad request and the errors.
  body('name', 'Name must be atleast 3 character').isLength({ min: 3 }), 
  body('email','Not a valid Email format').isEmail(), 
  body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
], async(req, res) =>  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  
}
    // res.send(req.body);
    // console.log(req.body)
    // check whether user with same email exists already

try {
  
let user = await User.findOne({email: req.body.email});
  // console.log(user)
if(user){
  return res.status(400).json({error: "Sorry a user with this email aready exists"})
}

  user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      
      res.json(user);

    } catch (error) {
  console.error(error.message);
  res.status(500).send("Some Error Occured");
    }
})


 // Earlier we used get but get use karenge toh system ke logs mei detail share ho jaati. for eg password are something jo hum nahi chahte dikhe kissi ko, so better privacy option is post.
// req-request, res-response

module.exports = router