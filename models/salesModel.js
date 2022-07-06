const StoreManager = require('./db');

const saleModel = {

   async exist(id) {
    const sql = 'SELECT 1 FROM sales WHERE id = ?';
    const [[item]] = await StoreManager.query(sql, [id]);
    return !!item;
  },

  async list() {
    const sql = `SELECT 
    sale_id as saleId,
    date, product_id as productId,
    quantity FROM sales_products 
    JOIN sales
    ON id = sale_id`;
    const [items] = await StoreManager.query(sql);
    return items;
  },

  async listById(id) {
    const sql = `SELECT 
    sale_id as saleId,
    date, product_id as productId,
    quantity FROM sales_products 
    JOIN sales
    ON id = sale_id
    where sale_id = ?`;
    const [item] = await StoreManager.query(sql, [id]);
    return item;
  },

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

  async remove(id) {
    const sql = 'DELETE FROM sales WHERE id = ?';
    await StoreManager.query(sql, [id]);
  },

  async removeProduct(id) {
    const sql = 'DELETE FROM sales_products WHERE sale_id = ?';
    await StoreManager.query(sql, [id]);
  },

  async update(id, changes) { 
    const sql = `UPDATE sales_products 
    SET product_id = ?, quantity = ?
    WHERE sale_id = ? AND product_id = ?;`;
    await StoreManager.query(sql, [changes.productId, changes.quantity, id, changes.productId]);
  },
};

module.exports = saleModel;