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
  //watch video on how this works
  // descriptions: String
  descriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Description"
    }
  ]
  });

module.exports = mongoose.model("Destination", destinationSchema);
