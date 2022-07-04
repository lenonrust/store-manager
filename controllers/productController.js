const productService = require('../services/productService');

const productController = {
  
  /** @type {import('express').RequestHandler} */
  
  async list(_req, res) {
  const items = await productService.list();
  return res.json(items);
  },

  async listByid(req, res) {
    try {
    const { id } = req.params;
    const item = await productService.listByid(id);
    return res.status(200).json(item);  
    } catch (error) {
    return res.status(404).json({ message: error.message });
    }
  },
  async add(req, res, next) {
    try {
      const data = await productService.validateBodyAdd(req.body);
      const id = await productService.add(data);
      const result = await productService.listByid(id);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = productController;