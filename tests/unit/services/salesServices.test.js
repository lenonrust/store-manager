const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesService = require('../../../services/salesServices');
const salesModel = require('../../../models/salesModel');

chai.use(chaiAsPromised);

describe('/service/sealesService', () => {
  beforeEach(sinon.restore);

describe('checkExist', () => {
    it('Should return an error if "saleModel.exist" fails', () => {
      sinon.stub(salesModel, 'exist').rejects();
      chai.expect(salesService.checkExist(0)).to.be.eventually.rejected;
    });
    it('Should return an error if "saleModel.exist" returns false', () => {
      sinon.stub(salesModel, 'exist').resolves(false);
      chai.expect(salesService.checkExist(0)).to.eventually.be.rejectedWith('Product not found');
    });
     it('Should return undefined if "saleModel.exist" returns true', () => {
      sinon.stub(salesModel, 'exist').resolves(true);
      chai.expect(salesService.checkExist(0)).to.eventually.be.undefined;
    });
  });

  describe('list', () => {
    it('Should return an error if "salesModel.list" fails', () => {
      sinon.stub(salesModel, 'list').rejects();
      chai.expect(salesService.list()).to.be.eventually.rejected;
    });
    it('Should return an "Array" if success', () => {
      sinon.stub(salesModel, 'list').resolves([{}]);
      chai.expect(salesService.list()).to.be.eventually.be.deep.equal([{}]);
    });
  });

   describe('listById', () => {
    it('Should return an error if "salesModel.listById" fails', () => {
      sinon.stub(salesModel, 'listById').rejects();
      chai.expect(salesService.listById(1)).to.be.eventually.rejected;
    });
    it('Should return an "Error" if "salesModel.listById" return a empty array', () => {
      sinon.stub(salesModel, 'listById').resolves([]);
      chai.expect(salesService.listById(1)).to.be.eventually.throw(Error);
    });
    it('Should return an "Array" if success', () => {
      sinon.stub(salesModel, 'listById').resolves([{}]);
      chai.expect(salesService.listById(1)).to.be.eventually.be.deep.equal([{}]);
    });
  });

  describe('addProduct', () => {

    it('Should return error if "salesModel.addProduct" fails', () => {
      sinon.stub(salesModel, 'addProduct').rejects();
      chai.expect(salesService.addProduct(1, {})).to.eventually.be.rejected;
    });
    it('Should return an object with "id" and "itemsSold"', async () => {
      const item = {
      id: 1,
      itemsSold: [{}],
      };
      sinon.stub(salesModel, 'add').resolves(1);
       sinon.stub(salesModel, 'addProduct').resolves({});
      const result =  await salesService.addProduct([{}])
      chai.expect(result).to.deep.equal(item)
    });
  });
 describe('remove', () => {
    it('Should return an error "salesModel.remove" fails', () => {
      sinon.stub(salesModel, 'remove').rejects();
      chai.expect(salesService.remove(0)).to.be.eventually.rejected;
    });
    it('Should return "undefined" "salesModel.remove" success', () => {
      sinon.stub(salesModel, 'remove').resolves();
      chai.expect(salesService.remove(0)).to.be.eventually.undefined;
  });
 });
  describe('removeProduct', () => {
    it('Should return an error "salesModel.removeProduct" fails', () => {
      sinon.stub(salesModel, 'removeProduct').rejects();
      chai.expect(salesService.removeProduct(0)).to.be.eventually.rejected;
    });
    it('Should return "undefined" "salesModel.removeProduct" success', () => {
      sinon.stub(salesModel, 'removeProduct').resolves();
      chai.expect(salesService.removeProduct(0)).to.be.eventually.undefined;
  });
  });
  describe('update', () => {

    it('Should return error if "salesModel.update" fails', () => {
      sinon.stub(salesModel, 'update').rejects();
      chai.expect(salesService.update(1, {})).to.eventually.be.rejected;
    });
    it('Should return an object with "saleId" and "itemsUpdated"', async () => {
      const item = {
      saleId: 1,
      itemsUpdated: [{}],
      };
      sinon.stub(salesModel, 'update').resolves();
      const result =  await salesService.update(1,[{}])
      chai.expect(result).to.deep.equal(item)
    });
  });
});