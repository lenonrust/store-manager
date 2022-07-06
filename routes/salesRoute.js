const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.get('/', salesController.list);

salesRouter.get('/:id', salesController.listByid);

salesRouter.post('/', salesController.add);

salesRouter.delete('/:id', salesController.remove);

module.exports = salesRouter;