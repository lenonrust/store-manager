const { Router } = require('express');
const productController = require('../controllers/productController');

const productRouter = Router();

productRouter.get('/search', productController.search);

productRouter.get('/:id', productController.listByid);

productRouter.put('/:id', productController.update);

productRouter.delete('/:id', productController.remove);

productRouter.get('/', productController.list);

productRouter.post('/', productController.add);

module.exports = productRouter;