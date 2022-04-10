const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        minlength: [2, "The item's name must be at least 2 characters."],
        required: [true, "Item name is required."]
    },
    location: {
        type: String,
        required: [true, "Item location is required."]
    },
    unit: {
        type: String,
        required: [true, "Item unit of measurement is required."]
    },
    cost: {
        type: Number,
        required: [true, "Item cost is required."]
    },
    distributor: {
        type: String,
        required: [true, "Item distributor is required."]
    },
    par: {
        type: Number,
        required: [true, "Item par level is required."]
    },
    amount: {
        type: Number,
    }
}, {timestamps:true});

module.exports = mongoose.model("Item", ItemSchema);
