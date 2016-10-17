var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    destinations: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination"
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
        ref: "destinations"
      }
    ],
      indetendedDestinations: [
        {
        type:mongoose.Schema.Types.ObjectId,
        ref: "destinations"
      }
    ],
    created: {type: Date, default: Date.now}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
