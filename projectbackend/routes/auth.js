var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const {
  signout,
  signup,
  signin,
  isSignedIn,
} = require("../controllers/auth.js");
/*
GET=get data from database
POST= Pass data to database
PUT= update things in database
DELETE= delete from database*/

router.post(
  "/signup",
  [
    check("name", "Name should be atleast 3 characters").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be atleast 3 chracters").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    //check("name", "Name should be atleast 3 characters").isLength({min: 2 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 3 }),
  ],
  signin
);

router.get("/signout", signout); //(route, controller)
//signout route clears up the cookies from the browser

router.get("/testroute", isSignedIn, (req, res) => {
  res.send("A protected Route!");
  res.json(req.authentication); //auth hold the id that signIn gives us
});

module.exports = router;
