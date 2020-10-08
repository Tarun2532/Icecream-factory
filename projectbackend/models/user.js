const mongoose = require("mongoose");
// const uuidv1 =require('uuid/v1')         //deprecation warning
// import { v1 as uuidv1 } from 'uuid';
const { v1: uuidv1 } = require("uuid");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },

    lastname: {
      type: String,
      // required: true,
      maxlength: 32,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    userInfo: {
      type: String,
      trim: true,
    },

    //storing encrypted password
    encry_password: {
      type: String,
      // trim: true,
      required: true,
    },

    salt: String,
  },

  { timestamps: true }
);

// virtual fields
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password; //_password is private variable
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  // 3
  authenticate: function (password) {
    return this.securePassword(password) === this.encry_password;
  },

  // 1
  //password => securepassword
  securePassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex"); //7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
    } catch (err) {
      return "";
    }
  },
};

//Schema Referred as = User
module.exports = mongoose.model("User", userSchema); //name used in controller
