const sinon = require('sinon');
const chai = require('chai');
const StoreManager = require('../../../models/db');
const productModel = require('../../../models/productModel');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('/model/productModels', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('return error if mysql returns error', () => {
      sinon.stub(StoreManager, 'query').rejects();
      const result = productModel.list();
      chai.expect(result).to.eventually.be.rejected;
    })
    it('Should return is empty', () => {
      sinon.stub(StoreManager, 'query').rejects();
      const result = productModel.list();
      chai.expect(result).to.eventually.be.undefined;
    });
    it('testing if return a list', () => {
      sinon.stub(StoreManager, 'query').resolves([[{}]]);
      const result = productModel.list();
      chai.expect(result).to.eventually.be.ok;
    });
  });
  describe('listById', () => {
    it('Should return an object', () => {
      sinon.stub(StoreManager, 'query').resolves([[{}]]);
      const result = productModel.listByid('1');
      chai.expect(result).to.eventually.be.instanceOf(Object);
    });
  });
});