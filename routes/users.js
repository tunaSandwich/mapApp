var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var Destination = require("../models/destination");
var mongoose    = require("mongoose");
var deepPopulate= require("mongoose-deep-populate")(mongoose);


//TESTING deepPopulate
router.get("/:id", function(req, res){
  User.findById(req.params.id)
  .populate("destinations")
  .populate("friends")
  .populate({
    path: "friends",
    populate: { path: "destinations", select: "position", model: Destination } // <--- specify the model explicitly
  })
  .exec(
    function(err, user){
      if(err){
        console.log(err);
      } else {
        console.log(user);
        console.log("=============================================");
        console.log("USER FRIENDS");
        console.log(user.friends);
        console.log("=============================================");
        //Passing user into index ejs file!
        //======================================
        //Populate destination array in friends
        res.render("users/index", {user: user});
      }
    });
});

// //User profile
// router.get("/:id", function(req, res){
//   User.findById(req.params.id)
//   .populate("destinations")
//   .populate("friends")
//   .populate("friends.destinations")
//   .exec(
//     function(err, user){
//       if(err){
//         console.log(err);
//       } else {
//         //Passing user into index ejs file!
//         //======================================
//         //Populate destination array in friends
//         console.log(user);
//         res.render("users/index", {user: user});
//       }
//     });
// });

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

//Show other users profile'
router.post("/:id/addfriend", middleware.isLoggedIn, function(req, res){
  User.findById(req.user._id, function(err, user){
    if(err){
      console.log(err);
      res.redirect("/:id");
    } else{
      //Add req.params.id 's id to friends array
      user.friends.push(req.params.id);
      console.log("==========currentUser==========");
      console.log(user);
      console.log("==========new friend's idr==========");
      console.log(req.params);
      user.save();
      req.flash("success", "Successfully followed ");
      res.redirect("/" + user._id);
    }
  });
});


//CREATE - add destination to database
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
router.delete("/:id/delete/:destinationId", middleware.isLoggedIn, function(req, res){
  Destination.findByIdAndRemove(req.params.destinationId, function(err){
    if(err){
      res.redirect("/" + req.params.id);
    } else{
      res.redirect("/" + req.params.id);
    }
  });
});

router.get("/*", function(req, res){
  res.send("Page not Found, sorry");
});

module.exports = router;
