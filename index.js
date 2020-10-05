// This file sets up the application

// avoid unsafe syntax, silent errors and make web app faster
"use strict";

// Mount web app framework
const express = require("express");

// const bodyParser = require("body-parser");
const session = require("express-session");

//const index = require("./routes/index");
//const auth = require("./routes/auth");

// Create web server
const app = express();

// Set view engine for Express
app.set("view engine", "ejs");

// Set up web server with path for static files
app.use(express.static("public"));

app.use(
  session({
    name: "SESSIONID",
    secret: "Node Cookbook",
    resave: false,
    saveUninitialized: false,
  })
);

// Import router object
const router = require('./router')

//app.use(bodyParser.urlencoded({ extended: false }));

// Set up middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Set up default path in router object
app.use('/', router);

//app.use("/", index);
//app.use("/auth", auth);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

