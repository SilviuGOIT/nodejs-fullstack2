const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tutors = new Schema({
  firstName: { type: String, required: [true], minLength: 2 },
  lastName: { type: String, required: [true], minLength: 2 },
  phone: { type: String, required: [true], minLength: 2 },
  email: { type: String, required: [true], minLength: 2 },
  city: { type: String, required: [true], minLength: 2 },
});

const Tutor = mongoose.model("tutors", tutors);
module.exports = Tutor;
