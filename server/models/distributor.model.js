const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DistributorSchema = new Schema({
    distName: {
        type: String,
        required:[true, "Distributor name is required."],
        minlength:[2, "Distributor name must be at least 2 characters long."]
    },
    repName: {
        type: String,
        required: [true, "Sales rep is required"]
    },
    phoneNumber: {
        type: String,
        required:[true, "Phone number is required"]
    },
    repEmail: {
        type: String,
        trim: true,
        lowercase: true,
    },
    orderDays: {
        type: Array,
    },
    orderCutoff: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps:true})

module.exports = mongoose.model("Distributor", DistributorSchema);