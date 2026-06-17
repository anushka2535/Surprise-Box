var mongoose = require("mongoose");

var Address = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  address: {
    type: String,
    required: true
  },
  landmark: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Address", Address);