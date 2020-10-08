const express = require("express");
const router = express.Router();

//from controller
const { getUser, updateUser, getAllUsers } = require("../controllers/user");
//to bring custom middlewares from auth
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

//to populate the req.profile
router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, getUser);
router.put("/user/:userId", isSignedIn, updateUser);

/*
router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);*/

//Testing
router.get("/users", getAllUsers);

module.exports = router;
