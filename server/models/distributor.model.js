const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DistributorSchema = new Schema({
    name: {
        type: String,
        required:[true, "Distributor name is required."],
        minlength:[2, "Distributor name must be at least 2 characters long."]
    },
    rep: {
        type: String,
        required: [true, "Sales rep is required"]
    },
    phoneNumber: {
        type: String,
        required:[true, "Phone number is required"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    orderDays: {
        type: Array,
    },
    orderCutoff: {
        type: String
    }
}, {timestamps:true})

module.exports = mongoose.model("Distributor", DistributorSchema);