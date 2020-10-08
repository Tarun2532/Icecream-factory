const User = require("../models/user");
//const Order = require("../models/order")

exports.getUserById = (req, res, id) => {
  // findById is same as findOne
  //whenever there is interaction with DB , it returns  1.error and  2.object
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found in database",
      });
    }
    req.profile = user; //storing user in profile object created inside request
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined; //or set it to empty
  req.profile.encry_password = undefined;
  //making createdAt and updatedAt undefined
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

//Testing Purpose
exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "There are No users in the database",
      });
    }
    req.profile = users;
    return res.json(req.profile);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update the user information",
        });
      }
      user.salt = undefined; //or set it to empty
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};

//middleware
