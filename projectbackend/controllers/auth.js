const User = require("../models/user.js");
const { check } = require("express-validator");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  /*console.log("REQ BODY", req.body)
     res.json({
        message: "Signup route works!"
    })*/

  const errors = validationResult(req);

  //error array not empty
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  // first param is error and second is object which  you can call anything
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in database",
      });
    }
    res.json({
      name: user.name, //can be checked in postman
      email: user.email,
      id: user._id,
    }); //send everything
  }); //to save in database
};

// extract email and password from req.body
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body; //destructuring

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "ERROR: Something went wrong!",
      });
    }
    if (!user) {
      return res.status(400).json({
        error: "USER email does not exists",
      });
    }

    //authenticate method models
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password does not match!",
      });
    }
    //signin- create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // and put it in cookies
    res.cookie("token", token, { expire: new Date() + 9999 });

    //sending response to frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  //clear the cookies
  res.clearCookie("token");
  res.json({
    message: "User Signout Successfully!",
  });
};

//Protected Routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  //next is not used because  it is present in expressJwt
});

//Custom Middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id; //just checking value(==) not object(===)
  // profile from front end only if signed in (true if user is signed in )
  //req auth is from auth middleware (isSignedIn)  (true if signed request is made )
  // profile id from front end whether it is equal to req.auth._id
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED here",
    });
  }
  next();
  //next is responsible for transfering the contol from one middleware to another
  // and from last middleware to RESPONSE
};
