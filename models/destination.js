var mongoose = require("mongoose");

var destinationSchema = new mongoose.Schema({
  //lat and lon
  //===========
  name: String,
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "photos"
    }
  ],
  description: String,
  owner: {
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String
  },
  created: {type: Date, default: Date.now}
  });

module.exports = mongoose.model("Destination", destinationSchema);
