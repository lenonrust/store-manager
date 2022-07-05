const Joi = require('joi');
const salesModel = require('../models/salesModel');
const { runSchema } = require('./utils');

const salesService = {

  validateBodyAddProduct: runSchema(Joi.object({
    productId: Joi.required(),
    quantity: Joi.number().required().min(1),
  })),

  async list() {
    const items = await salesModel.list();
    return items;
  },

  async listById(id) {
    const item = await salesModel.listById(id);
      if (!item || item.length === 0) {
      throw new Error('Sale not found');
    }
    return item;
  },

  async addProduct(value) {
    const id = await salesModel.add();
    await Promise.all(value.map((item) => salesModel.addProduct(id, item)));
    const result = {
      id,
      itemsSold: value,
    };
    return result;
  },
};

module.exports = salesService;