const productService = require('../services/productService');
const salesService = require('../services/salesServices');

const salesController = {

  /** @type {import('express').RequestHandler} */

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