const mongoose = require("mongoose");

const product= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: String,
        required: true
    },

    image: {
        type: String
    }
});

module.exports = mongoose.model("product", product);