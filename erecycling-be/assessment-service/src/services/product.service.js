const Product = require("./../model/product.model");

class ProductService {
  async createNewProduct(dto) {
    const newProduct = await Product.create(dto);
    return newProduct;
  }

  async getById(id) {
    const product = await Product.findOne({ _id: id });
    return product;
  }

  async getAll() {
    const products = await Product.find({});
    return products;
  }

  async updateById(id, dataUpdated) {
    console.log(id)
    const filter = { _id: id };
    const data = await Product.findOneAndUpdate(filter, dataUpdated);
    return data;
  }
}

module.exports = new ProductService();
