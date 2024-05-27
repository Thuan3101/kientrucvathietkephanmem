const ProductService = require("./../services/product.service");
class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAll();
      return res.json({
        status: 200,
        message: "OK",
        data: products,
      });
    } catch (err) {
      return res.json({
        status: 500,
        message: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getById(id);
      return res.json({
        status: 200,
        message: "OK",
        data: product,
      });
    } catch (err) {
      return res.json({
        status: 500,
        message: err.message,
      });
    }
  }

  async updateById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.updateById(id, req.body);
      return res.json({
        status: 200,
        message: "OK",
        data: product,
      });
    } catch (err) {
      return res.json({
        status: 500,
        message: err.message,
      });
    }
  }
}

module.exports = new ProductController();
