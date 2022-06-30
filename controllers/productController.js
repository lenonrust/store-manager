const productService = require('../services/productService');

const productController = {
  
  /** @type {import('express').RequestHandler} */
  
  async list(_req, res) {
  const items = await productService.list();
  res.json(items);
  },

  async listByid(req, res) {
    try {
    const { id } = req.params;
    const item = await productService.listByid(id);
    res.status(200).json(item);  
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};
module.exports = productController;