const sinon = require('sinon');
const chai = require('chai');
const StoreManager = require('../../../models/db');
const chaiAsPromised = require('chai-as-promised');
const saleModel = require('../../../models/salesModel');

chai.use(chaiAsPromised);

describe('/model/salesModel', () => {
  beforeEach(sinon.restore);
  
  describe('lis', () => {
    it('Should return error if mysql query fails', () => {
      sinon.stub(StoreManager, 'query').rejects(); 
      chai.expect(saleModel.list()).to.eventually.be.rejected;
    });
     it('Should return an "Object" in case of success', () => {
      sinon.stub(StoreManager, 'query').resolves([{  }]);     
      chai.expect(saleModel.list()).to.eventually.be.equal([{  }]);
    })
  });

  describe('lisById', () => {
     it('Should return error if mysql query fails', () => {
      sinon.stub(StoreManager, 'query').rejects(); 
      chai.expect(saleModel.listById(1)).to.eventually.be.rejected;
     });
    it('Should return an "Array" in case of success', () => {
      sinon.stub(StoreManager, 'query').resolves([{  }]);     
      chai.expect(saleModel.listById(1)).to.eventually.be.equal([{  }]);
    })
  });

  describe('add', () => {
    it('Should return error if mysql query fails', () => {
      sinon.stub(StoreManager, 'query').rejects();     
      chai.expect(saleModel.add()).to.eventually.be.rejected;
    })
    it('Should return an "id" in case of success', () => {
      sinon.stub(StoreManager, 'query').resolves([{ insertId: 1 }]);     
      chai.expect(saleModel.add()).to.eventually.be.equal(1);
    })
    
  });
  describe('addProduct', () => {
    it('Should return error if mysql query fails', () => {
      sinon.stub(StoreManager, 'query').rejects();
      chai.expect(saleModel.addProduct()).to.eventually.be.rejected;
    });
    it('Should return an "id" in case of success', () => {
      sinon.stub(StoreManager, 'query').resolves([{ insertId: 1 }]);     
      chai.expect(saleModel.addProduct(1, {})).to.eventually.be.equal(1);
    })
  })
})