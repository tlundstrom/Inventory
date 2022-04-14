const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name: {
        type: String,
        required:[true, "Location name is required."],
        minlength:[2, "Location name must be at least 2 characters long."]
    },
    locationTemp: {
        type: String,
        enum:[
            "Dry Storage",
            "Refrigerated",
            "Frozen"
        ],
        required: [true, "Location temperature is required"]
    },
    inventorySchedule: {
        type: String,
        enum: [
            "DNI",
            "Monthly",
            "Quarterly",
            "Bi-Yearly",
            "Yearly"
        ],
        required:[true, "Inventory frequency is required"]
    },
    reminders: {
        type: Boolean
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps:true})

module.exports = mongoose.model("Location", LocationSchema);