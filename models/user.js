var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    destinations: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "destinations"
    }
  ],
    description: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "description"
      }
    ],
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "photos"

      }
    ],
      visitedDestination: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "destination"
      }
    ],
      indetendedDestinations: [
        {
        type:mongoose.Schema.Types.ObjectId,
        ref: "destination"
      }
    ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
