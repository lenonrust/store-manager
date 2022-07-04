const sinon = require('sinon');
const chai = require('chai');
const StoreManager = require('../../../models/db');
const chaiAsPromised = require('chai-as-promised');
const saleModel = require('../../../models/salesModel');

chai.use(chaiAsPromised);

describe('/model/salesModel', () => {
  beforeEach(sinon.restore);
   
  describe('add', () => {
    it('Should return error if mysql returns error', () => {
      sinon.stub(StoreManager, 'query').rejects();     
      chai.expect(saleModel.add()).to.eventually.be.rejected;
    })
    it('Should return an "id" in case of success', () => {
      sinon.stub(StoreManager, 'query').resolves([{ insertId: 1 }]);     
      chai.expect(saleModel.add()).to.eventually.be.equal(1);
    })
    
  });
  describe('addProduct', () => {
    it('Should return error if mysql returns error', () => {
      sinon.stub(StoreManager, 'query').rejects();
      chai.expect(saleModel.addProduct()).to.eventually.be.rejected;
    });
    it('Should return an "id" in case of success', () => {
      sinon.stub(StoreManager, 'query').resolves([{ insertId: 1 }]);     
      chai.expect(saleModel.addProduct(1, {})).to.eventually.be.equal(1);
    })
  })
})