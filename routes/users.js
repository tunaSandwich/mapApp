var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var Description = require("../models/description");
var Destination = require("../models/destination");


//User profile
router.get("/:id", function(req, res){
  User.findById(req.params.id).populate("destinations").exec(
    function(err, user){
      if(err){
        console.log(err);
      } else {
        console.log(user);
        res.render("users/index", {user: user});
      }
    });
});

//NEW Show New  destination form
router.get("/:id/new", function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err){
      console.log(err);
    } else {
      res.render("destinations/new", {user: user});
    }
  });
});

//CREATE - add destination to database
//TODO make the post request
router.post("/:id/new/destinations", function(req, res){
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
      //req.body is everything sent from form.
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //TODO make sure visitedDestinations and destinationWishlist gets populated in user!!
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    }
  });
});


module.exports = router;
