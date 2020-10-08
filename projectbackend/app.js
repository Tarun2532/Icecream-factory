const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const app = express();

// middlewares used
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");

// middlewares
app.use(cookieParser()); //create or put/delete values cookies in browser
app.use(cors());

// routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//DB Connection
const database = require("./database/db.js");

//PORT
const port = process.env.PORT || 8000;

//Starting a Server
app.listen(port, () => {
  console.log(`App is running at https://localhost:${port}`);
});

// request <=> middleware <=> response
// request <=> middleware  next() next() next() <=> response
