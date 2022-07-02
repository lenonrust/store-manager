const { Router } = require('express');
const productController = require('../controllers/productController');

const productRouter = Router();

productRouter.get('/:id', productController.listByid);

productRouter.get('/', productController.list);

productRouter.post('/', productController.add);

module.exports = productRouter;