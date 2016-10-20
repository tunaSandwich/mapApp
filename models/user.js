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
  friends: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
],
    created: {type: Date, default: Date.now},
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
