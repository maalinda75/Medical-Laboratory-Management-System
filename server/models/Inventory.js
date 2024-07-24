// inventorySchema.js

const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number, default: 0 } // Add totalPrice field
});

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
