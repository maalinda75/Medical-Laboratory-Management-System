const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  testType: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true }
});

const Test = mongoose.model("Test", testSchema);
module.exports = Test;