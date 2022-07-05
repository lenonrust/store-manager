const productService = require('../services/productService');
const salesService = require('../services/salesServices');

const salesController = {

  /** @type {import('express').RequestHandler} */

  async list(_req, res) {
    const items = await salesService.list();
    return res.json(items);
  },

  async listByid(req, res) {
    try {
      const { id } = req.params;
      const items = await salesService.listById(id);
      const result = items.map((item) => {
        const newResult = {
          date: item.date,
          productId: item.productId,
          quantity: item.quantity,
        };
        return newResult;
        });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },

  async add(req, res, next) {
    try {
      const value = req.body;
      await Promise
        .all(value.map((item) => salesService.validateBodyAddProduct(item)));
      await Promise
        .all(value.map((item) => productService.listByid(item.productId)));
      const result = await salesService.addProduct(value);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = salesController;