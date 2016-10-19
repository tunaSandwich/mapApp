var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var Destination = require("../models/destination");


//User profile
router.get("/:id", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id).populate("destinations").exec(
    function(err, user){
      if(err){
        console.log(err);
      } else {
        //Passing user into index ejs file!
        //======================================
        res.render("users/index", {user: user});
      }
    });
});

//NEW Show New  destination form
router.get("/:id/new", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id).populate("destinations").exec(
    function(err, user){
      if(err){
        console.log(err);
      } else {
        res.render("destinations/new", {user: user});
    }
  });
});

//CREATE - add destination to database
//TODO make the post request
router.post("/:id/new/destinations", middleware.isLoggedIn, function(req, res){
  // used req.params.id to get id from in :id.
  User.findById(req.params.id, function(err, user){
    if(err){
      console.log(err);
      res.redirect("/:id/new");
    } else{
      //Add Destination info to user
        Destination.create(req.body.destination, function(err, destination){
           if(err){
               req.flash("error", "Something went wrong");
               console.log(err);
           } else {
             //add the owner's id to  destination
             destination.owner.id = req.user._id;
             destination.owner.username = req.user.username;
            //  destination.descriptions = req.user.
             destination.save();
             //push the new destination into user schema
             user.destinations.push(destination);
             user.save();

             req.flash("success", "Successfully added desitination");
             res.redirect('/' + user._id);
          }
          });
    }
  });
});

//Destroy Destination
router.delete("/:id/:destinationId", middleware.isLoggedIn, function(req, res){
  Destination.findByIdAndRemove(req.params.destinationId, function(err){
    if(err){
      res.redirect("/" + req.params.id);
    } else{
      res.redirect("/" + req.params.id);
    }
  });
});

module.exports = router;
