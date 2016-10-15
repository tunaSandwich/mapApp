var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var Description = require("../models/description");
var Destination = require("../models/destination");


//User profile
router.get("/:id", function(req, res){
  console.log(req.params.id);
  User.findById(req.params.id, function(err, user){
    if(err){
      console.log(err);
    } else {
      res.render("users/index", {user: user});
    }
  });
});

//New destination
router.get("/:id/new", function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err){
      console.log(err);
    } else {
      res.render("destinations/new", {user: user});
    }
  });
});


module.exports = router;
