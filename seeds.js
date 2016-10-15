var mongoose = require("mongoose"),
  Campground  = require("./models/campground"),
  Comment     = require("./models/comment"),
  Description = require("./models/description"),
  Destination = require("./models/destination"),
  Photos      = require("./models/photos"),
  User        = require("./models/user");

var userData = [
  {
    username: "Lucas Garza",
  },
  {
    username: "Santi Garza",
  },
  {
    username: "Clara Garza",
  }
];


function seedDB(){
   //Remove all campgrounds
   User.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed users!");
        userData.forEach(function(seed){
          User.create(seed, function(err, user){
            if(err){
              console.log(err);
            } else{
              console.log("added a user");
              //Create a destination
              Destination.create(
                {
                  name: "Los Angeles",
                }, function(err, destination){
                  if(err){
                    console.log(err);
                  } else {
                    user.destinations.push(destination);
                    user.save();
                    console.log("Created a destination");
                  }
                });
            }
          });
        });
    });
    //add a few comments
}

module.exports = seedDB;
