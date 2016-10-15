var mongoose = require("mongoose");

var descriptionSchema = new mongoose.Schema({
  text: String,
  //Rewatch video on using author
  author: String
  // author:{
  //   id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User"
  //   },
  //   username: String
  //   }
  });

module.exports = mongoose.model("Description", descriptionSchema);
