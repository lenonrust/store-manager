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
   async add(value) {
     const sql = 'INSERT INTO products (name) VALUES (?)';
     const [{ insertId }] = await StoreManager.query(sql, [value.name]);
     return insertId;
  },

};

module.exports = productModel;