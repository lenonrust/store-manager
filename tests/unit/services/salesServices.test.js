const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesService = require('../../../services/salesServices');
const salesModel = require('../../../models/salesModel');

chai.use(chaiAsPromised);

describe('/service/sealesService', () => {
  beforeEach(sinon.restore);

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
});