const express = require('express');
const errorMiddlewareHandler = require('./middlewares/errorMiddlewareHandler');
const productRouter = require('./routes/productRoute');
const salesRoute = require('./routes/salesRoute');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/products', productRouter);

app.use('/sales', salesRoute);

app.use(errorMiddlewareHandler);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;