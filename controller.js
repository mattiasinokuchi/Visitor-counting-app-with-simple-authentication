// Make handlers available from router.js
module.exports = {

  // Handler for (GET) request to login page...
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
    if (req.body.username === "Mattias" && req.body.password === "fiol") {
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
  }
}