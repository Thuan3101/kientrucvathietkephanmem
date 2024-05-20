const mongoose = require("mongoose");
const assessmentSchema = new mongoose.Schema({
    checker: {
        id: {
            type: mongoose.Types.ObjectId,
        },
        firstName: String,
        lastName: String
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "destroy", "resell"],
        default: 'pending'
    },

    cashbackAmount: {
        type: Number,
        default: 0
    },

    result: {
        type: String,
        default: ""
    },

    isMoneySentToUser: {
        type: Boolean,
        default: false
    },
    inquiry: {
        type: mongoose.Types.ObjectId, ref: 'inquiry'
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    }

}, {timestamps: true})

const Assessment = mongoose.model("assessment", assessmentSchema);
module.exports = Assessment;