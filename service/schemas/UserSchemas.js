const mongoose = require("mongoose");

const Schema = moongose.Schema;

const user = new Schema({
  nume: { type: String, required: [true], minLength: 2 },
  //...
});

const User = mongoose.model("users", user);
module.exports = User;
