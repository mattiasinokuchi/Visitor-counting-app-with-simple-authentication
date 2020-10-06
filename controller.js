// This file contains logic that updates data and view

// Import data model
const CountModel = require("./model");

// Define userId for database queries
const userId = "5f4738e383be40030df5be1c";

// Make handlers available from router.js
module.exports = {

  // Handler for request to home page
  home: (req, res) => {
    const user = req.session.user;
    res.render("index", { user });
  },

  // Handler for (GET) request to login page
  getLogin: (req, res, next) => {
    res.render("login", { fail: false });
    next();
  },

  // Handler for POST request to login
  postLogin: (req, res, next) => {
    if (req.session.user) {
      res.redirect("/");
      next();
      return;
    }
    if (req.body.username === process.env.un && req.body.password === process.env.pw) {
      req.session.user = { name: req.body.username };
      res.redirect("/");
      next();
      return;
    }
    res.render("login", { fail: true });
    next();
  },

  // Handler for request to logout
  logout: (req, res, next) => {
    req.session.user = null;
    res.redirect("/");
  },

  // Handler for request to load data...
  load: async (req, data) => {
    try {
      // ...finds user...
      const doc = await CountModel.findById(userId);
      // ...and responds
      let date = new Date(Date.now());
      if (doc.que.length > 1) {
        date = doc.que[1].date;
      }
      data.json({
        letIn: doc.letIn,
        letOut: doc.letOut,
        que: doc.que[doc.que.length - 1].number,
        call: doc.que[0].number,
        queTime: date.getTime()
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Handler for request to let in visitors...
  in: async (req, data) => {
    try {
      // ...finds user...
      const doc = await CountModel.findById(userId);
      // ...add one to letIn...
      let count = doc.letIn;
      count++;
      doc.letIn = count;
      // ...save count...
      await doc.save();
      // ...and responds
      data.json({
        letIn: doc.letIn,
        letOut: doc.letOut
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Handler for request to let out visitors...
  out: async (req, data) => {
    try {
      // ...find user...
      const doc = await CountModel.findById(userId);
      // ...add one to letOut...
      let count = doc.letOut;
      count++;
      doc.letOut = count;
      // ...save count...
      await doc.save();
      // ...and responds
      data.json({
        letIn: doc.letIn,
        letOut: doc.letOut
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Handler for request to reset visitor counter...
  reset: async (req, data) => {
    try {
      // ...find user...
      const doc = await CountModel.findById(userId);
      // ...reset counts...
      doc.letIn = 0;
      doc.letOut = 0;
      doc.que = [];
      let newDate = new Date(Date.now());
      doc.que.push({
        date: newDate,
        number: 0
      });
      // ...save count...
      await doc.save();
      // ...and return object
      data.json({
        letIn: doc.letIn,
        letOut: doc.letOut,
        que: doc.que[doc.que.length - 1].number,
        call: doc.que[0].number,
        queTime: 0
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Handler for request to put visitor in que...
  que: async (req, data) => {
    try {
      // ...find user...
      const doc = await CountModel.findById(userId);
      let newDate = new Date(Date.now());
      let number = doc.que[doc.que.length - 1].number;
      number++;
      doc.que.push({
        date: newDate,
        number: number
      });
      // ...save...
      await doc.save();
      // ...and return object
      data.json({
        que: number,
        queTime: doc.que[1].date.getTime()
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Handler for request to call visitor from que...
  call: async (req, data) => {
    try {
      // ...finds user...
      const doc = await CountModel.findById(userId);
      if (doc.que.length > 1) {
        // ...removes the first element from the que array (if present) and saves...
        doc.que.shift();
        doc.save();
      }
      // ...set current time for que if no que is present...
      let date = new Date(Date.now());
      if (doc.que.length > 1) {
        // ...or set time for que with the second element (if que present)...  
        date = doc.que[1].date;
      }
      // ...and responds
      data.json({
        que: doc.que[doc.que.length - 1].number,
        call: doc.que[0].number,
        queTime: date.getTime()
      });
    } catch (error) {
      console.log(error);
    }
  }

}