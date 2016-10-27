var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName});
    var newUserId = newUser._id;
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to MapApp " + user.username + "! Begin by Adding a location to your map. ");
           res.redirect("/"+ newUserId);
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login"
}), function(req, res){
        res.redirect("/" + req.user._id);
  });

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/");
});

//query search route
router.post("/search", function(req, res){
  var searchInput = req.body.searchInput;
  res.redirect("/search/" + searchInput);
});

router.get("/search/:searchInput", function(req, res){
  var searchInput = req.params.searchInput;
  User.find(
    { $text : {$search : searchInput} },
    { score : {$meta : "textScore"}})
    .sort({ score : {$meta : "textScore"}})
    .exec(function(err, results) {
      res.render("searchResults", {results: results});
    });
});

module.exports = router;
