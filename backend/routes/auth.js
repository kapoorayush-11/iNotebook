// auths or notes mei jaa kar hum basically api ko banaa rhe.

const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const { useImperativeHandle } = require("react/cjs/react.production.min");

const JWT_SECRET = "Ayushisagoodb$oy";

// ROUTE 1: Create a user using : POST "/api/auth/createuser".
//Doesn't require Authorization (End point ke baare mei pata chal jaayega ki login chahiye isko  use krne ke liye ki nahi)

router.post( "/createuser", [
    // If there are errors, return bad request and the errors.
    body("name", "Name must be atleast 3 character").isLength({ min: 3 }),
    body("email", "Not a valid Email format").isEmail(),
    body("password", "Password must be atleast 5 character").isLength({min: 5,}),
  ],
  async (req, res) => {
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // res.send(req.body);
    // console.log(req.body)
    // check whether user with same email exists already

    try {
      let user = await User.findOne({ email: req.body.email });
      // console.log(user)
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email aready exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      // res.json(user);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured yaar");
    }
  }
);

// Earlier we used get but get use karenge toh system ke logs mei detail share ho jaati. for eg password are something jo hum nahi chahte dikhe kissi ko, so better privacy option is post.
// req-request, res-response

// ROUTE 2: Authenticate a user using : POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    // If there are errors, return bad request and the errors.
    body("email", "Not a valid Email format").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please enter correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error bro");
    }
  }
);

// ROUTE 3: Get loggedin user details using : POST "/api/auth/getuser". Login required.
router.post(
  "/getuser", fetchuser, async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error hoiya");
    }
  }
);

module.exports = router;
