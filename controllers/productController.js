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

  async update(req, res, next) {
    try {
      const { id } = req.params;
      await productService.validateBodyAdd(req.body);
      const changes = await productService.validateBodyEdit(req.body);
      await productService.checkExist(id);
      await productService.update(id, changes);
      const updatedData = await productService.listByid(id);
      return res.status(200).json(updatedData);
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      await productService.checkExist(id);
      await productService.remove(id);
      return res.sendStatus(204);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },

  async search(req, res, next) {
    try {
      const searchTerm = req.query.q;
      const term = `%${searchTerm}%`;

      if (searchTerm === '') {
        const items = await productService.list();
        return res.status(200).json(items);
      } 
      const result = await productService.search(term);
        return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

};
module.exports = productController;