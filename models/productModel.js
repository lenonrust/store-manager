const StoreManager = require('./db');

const productModel = {

  async exist(id) {
    const sql = 'SELECT 1 FROM products WHERE id = ?';
    const [[item]] = await StoreManager.query(sql, [id]);
    return !!item;
  },

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

  async remove(id) {
    const sql = 'DELETE FROM products WHERE id = ?';
    await StoreManager.query(sql, [id]);
  },

  async update(id, changes) {
    const sql = 'UPDATE products SET ? WHERE id = ?;';
    await StoreManager.query(sql, [changes, id]);
  },
};

module.exports = productModel;