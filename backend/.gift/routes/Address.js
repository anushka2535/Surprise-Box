var express = require("express");
var router = express.Router();

const Address = require("../model/address");

console.log("Address Router Loaded");

// STORE Address
router.post("/add", async (req, res) => {

  console.log("Received Data:", req.body);

  try {

    const address = new Address({
      
        userId: req.body.userId,   // ✅ ADD THIS
        address: req.body.address,
        landmark: req.body.landmark,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode
      });

    

    await address.save();

    res.status(201).json({
      success: true,
      address
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

router.get("/:userId", async (req, res) => {
  try {
    const address = await Address.findOne({ userId: req.params.userId });

    res.json(address);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;