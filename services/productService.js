const productModel = require('../models/productModel');

const productService = {
  async list() {
    const items = await productModel.list();
    return items;
  },

  async listByid(id) {
    const item = await productModel.listByid(id);
    if (!item) {
      throw new Error('Product not found');
    }
    return item;
  }, 
  async add(value) {
    const id = await productModel.add(value);
    return id;
  },
};

module.exports = productService;
