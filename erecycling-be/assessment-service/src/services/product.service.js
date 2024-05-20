const Product = require("./../model/product.model")

class ProductService {
    async createNewProduct(dto) {
        const newProduct = await Product.create(dto)
        return newProduct
    }

    async getAll() {
        const products = await Product.find({})
        return products
    }
}

module.exports = new ProductService()