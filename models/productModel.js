const StoreManager = require('./db');

const productModel = {
  async list() {
    const sql = 'SELECT * FROM products';
    const [items] = await StoreManager.query(sql);
    return items;
  },

  async listByid(id) {
    const sql = 'SELECT * FROM products WHERE id = ?';
    const [[item]] = await StoreManager.query(sql, [id]);
    return item;
  },
};

module.exports = productModel;