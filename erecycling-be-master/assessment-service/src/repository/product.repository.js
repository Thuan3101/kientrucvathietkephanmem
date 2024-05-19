const Product = require("../model/product.model")

class ProductRepository {
    async createNew(data) {
        const rs = Product.create(data)
        return rs
    }

    async getAll() {
        const rs = Inquiry.find({})
        return rs

    }
    
    async updateStatus() {

    }
}
module.exports = new ProductRepository()
