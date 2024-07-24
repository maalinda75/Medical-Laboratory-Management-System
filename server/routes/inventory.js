// inventoryRoutes.js

const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");

// Route to get all inventory items
router.get("/", (req, res) => {
  Inventory.find()
    .then((inventoryItems) => res.json(inventoryItems))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route to add a new inventory item
router.post("/add", (req, res) => {
  const { itemName, quantity, price } = req.body;
  const newItem = new Inventory({ itemName, quantity, price });

  newItem
    .save()
    .then(() => res.json("Inventory item added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route to update an existing inventory item
router.put("/update/:id", (req, res) => {
  const { itemName, quantity, price } = req.body;
  Inventory.findByIdAndUpdate(req.params.id, { itemName, quantity, price })
    .then(() => res.json({ message: "Inventory item updated!" }))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route to delete an existing inventory item
router.delete("/delete/:id", (req, res) => {
  Inventory.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Inventory item deleted." }))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
