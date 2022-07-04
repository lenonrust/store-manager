const Joi = require('joi');
const salesModel = require('../models/salesModel');
const { runSchema } = require('./utils');

const salesService = {

  validateBodyAddProduct: runSchema(Joi.object({
    productId: Joi.required(),
    quantity: Joi.number().required().min(1),
  })),

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