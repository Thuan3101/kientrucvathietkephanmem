const ProductService = require("./../services/product.service")
class ProductController {
    async getAllProducts() {
        try {
            const products = await ProductService.getAll()
            return res.json({
                status: 200,
                message: "OK",
                data: products

            });
        } catch (err) {
            return res.json({
                status: 500,
                message: err.message,
            });
        }
    }
}

module.exports = new ProductController()