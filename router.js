// This file forwards requests to handlers in the controller-file

// Mount web app framework
const express = require('express');

// Create a new router object 
const router = express.Router();

// Import controller
const controller = require('./controller');

// Define router
router.get("/", controller.home);
router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);
router.get("/logout", controller.logout);
router.get("/load", controller.load);
router.get("/let-in", controller.in);
router.get("/let-out", controller.out);
router.get("/reset", controller.reset);
router.get("/que", controller.que);
router.get("/call", controller.call);

// Make routes available from server.js
module.exports = router;