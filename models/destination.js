var mongoose = require("mongoose");

var destinationSchema = new mongoose.Schema({
  name: String,
  position: String,
  images: String,
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
