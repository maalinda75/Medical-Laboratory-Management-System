const router = require("express").Router();
const Test = require("../models/Test");

// Add new test
router.route('/add').post(async (req, res) => {
  const { testName, testType, date, price } = req.body;

  const newTest = new Test({
    testName,
    testType,
    date,
    price,
  });

  try {
    const savedTest = await newTest.save();
    res.status(201).json(savedTest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tests
router.route("/").get(async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update test
router.route("/update/:id").put(async (req, res) => {
  let testId = req.params.id;
  try {
    const updatedTest = await Test.findByIdAndUpdate(testId, req.body, { new: true });
    res.json({ message: "Test updated", updatedTest });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete test
router.route("/delete/:id").delete(async (req, res) => {
  let testId = req.params.id;
  try {
    await Test.findByIdAndDelete(testId);
    res.json({ message: "Test deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific test
router.route("/get/:id").get(async (req, res) => {
  let testId = req.params.id;
  try {
    const test = await Test.findById(testId);
    res.json(test);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;