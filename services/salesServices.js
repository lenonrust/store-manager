const Joi = require('joi');
const salesModel = require('../models/salesModel');
const { runSchema } = require('./utils');

const salesService = {

  validateBodyAddProduct: runSchema(Joi.object({
    productId: Joi.required(),
    quantity: Joi.number().required().min(1),
  })),

  async checkExist(id) {
    const exist = await salesModel.exist(id);
    if (!exist) throw new Error('Sale not found');
  },

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

  async remove(id) {
    await salesModel.remove(id);
  },

  async removeProduct(id) {
    await salesModel.removeProduct(id);
  },

  async update(id, changes) {
    await Promise.all(changes.map((item) => salesModel.update(id, item)));
    const result = {
      saleId: id,
      itemsUpdated: changes,
    };
    return result;
  },

};

module.exports = salesService;