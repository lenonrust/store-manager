const StoreManager = require('./db');

const saleModel = {

  async add() {
    const sql = 'INSERT INTO sales (date) VALUES (current_timestamp())';
    const [{ insertId }] = await StoreManager.query(sql);
    return insertId;
  },

  async addProduct(id, value) {
    const sql = `INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (?,?,?)`;
    const [{ insertId }] = await StoreManager.query(sql, [id, value.productId, value.quantity]);
    return insertId;
  },
};

module.exports = saleModel;