const productService = require('../services/productService');
const salesService = require('../services/salesServices');

const salesController = {

  /** @type {import('express').RequestHandler} */

  async add(req, res, next) {
    try {
      const value = req.body;
      const data = await Promise
      .all(value.map((item) => salesService.validateBodyAddProduct(item)));
      await Promise.all(value.map((item) => productService.listByid(item.productId)));
      const result = await salesService.addProduct(data);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = salesController;