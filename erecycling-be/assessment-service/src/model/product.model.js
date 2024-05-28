const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    sku: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    model: {
        type: String,
    },
    likeNewPercent: {
        type: Number
    },
    status: {
        type: String,
        enum: ["instock", "destroyed", "soldout"],
        default: 'instock'
    },
    cost: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    images: [String],
    dateOfPurchase: Date

}, { timestamps: true })

const Product = mongoose.model("product", productSchema);
module.exports = Product;