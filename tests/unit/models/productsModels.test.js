const sinon = require('sinon');
const chai = require('chai');
const StoreManager = require('../../../models/db');
const productModel = require('../../../models/productModel');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('/model/productModel', () => {
  beforeEach(sinon.restore);

  describe('exist', () => {
    it('Should return an error if mysql query fails', () => {
      sinon.stub(StoreManager, 'query').rejects();
      chai.expect(productModel.exist(0)).to.eventually.be.rejected;
    })
    it('Should return "false" if myql query returns an empty array', () => {
      sinon.stub(StoreManager, 'query').resolves([[]]);
      chai.expect(productModel.exist(0)).to.eventually.be.undefined;
    })
    it('Should return "false" if myql query returns an array', () => {
      sinon.stub(StoreManager, 'query').resolves([[{}]]);
      chai.expect(productModel.exist(0)).to.eventually.be.deep.equal({})
    })
  });

  describe('list', () => {
    it('Should return error if mysql query fails', () => {
      sinon.stub(StoreManager, 'query').rejects();
      const result = productModel.list();
      chai.expect(result).to.eventually.be.rejected;
    })
    it('Should return is empty', () => {
      sinon.stub(StoreManager, 'query').rejects();
      const result = productModel.list();
      chai.expect(result).to.eventually.be.undefined;
    });
    it('Should return a list', () => {
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
  describe('add', () => {
    it('Should return an id', () => {
      sinon.stub(StoreManager, 'query').resolves([[{}]]);
      const result = productModel.add({name: 'produtoX'});
      chai.expect(result).to.eventually.be.instanceOf(String);
    });
  });
  describe('remove', () => {
    it('Should return an error if mysql query fails', () => {
      sinon.stub(StoreManager, 'query').rejects();
      return chai.expect(productModel.remove(0)).to.be.eventually.rejected;
    });
    it('should return undefined in case of success', () => {
      sinon.stub(StoreManager, 'query').resolves();
      return chai.expect(productModel.remove(0)).to.be.eventually.undefined;
    });
  });
  describe('update', () => {
    it('Should return an error if mysql query fails', () => {
      sinon.stub(StoreManager, 'query').rejects();
      return chai.expect(productModel.update(0,{})).to.be.eventually.rejected;
    });
    it('should return undefined in case of success', () => {
      sinon.stub(StoreManager, 'query').resolves();
      return chai.expect(productModel.update(0, {})).to.be.eventually.undefined;
    });
  });
  describe('search', () => {
    it('Should return error if mysql query fails', () => {
      sinon.stub(StoreManager, 'query').rejects();
      chai.expect(productModel.search('')).to.eventually.be.rejected;
    })
    it('Should return a list', () => {
      sinon.stub(StoreManager, 'query').resolves([[{}]]);
      chai.expect(productModel.search('Martelo')).to.eventually.be.deep.equal([{}])
    });
  });
});