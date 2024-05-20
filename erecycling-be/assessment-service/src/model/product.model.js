const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    model: {
        type: String,
        required: true
    },
    likeNewPercent: {
        type: Number
    },
    status: {
        type: String,
        required: true,
        enum: ["instock", "destroyed", "soldout"],
        default: 'instock'
    },
    cost: {
        type: Number,
        requird: true,
        default: 0
    },
    price: {
        type: Number,
        requird: true,
        default: 0
    },
    images: [String],
    dateOfPurchase: Date

}, { timestamps: true })

const Product = mongoose.model("product", productSchema);
module.exports = Product;