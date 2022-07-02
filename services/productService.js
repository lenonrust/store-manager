const Joi = require('joi');
const productModel = require('../models/productModel');

const productService = {
  
  async validateBodyAdd(value) {
    const schema = Joi.object({
      name: Joi.string().min(5).max(100).required(),
    });
    const result = await schema.validateAsync(value);
    return result;
  },
  
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
