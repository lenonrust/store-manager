const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesServices');
const productService = require('../../../services/productService');

chai.use(chaiAsPromised);

describe('controllers/salesController', () => {
  beforeEach(sinon.restore)
  
  describe('add', () => {
    it('Should return error if "salesService.validateBodyAddProduct" fails', () => {
      sinon.stub(salesService, 'validateBodyAddProduct').rejects();
      chai.expect(salesController.add({}, {})).to.be.eventually.rejected;
    })
    it('Should return error if "productService.listByid" fails', () => {
      sinon.stub(salesService, 'validateBodyAddProduct').resolves();
      sinon.stub(productService, 'listByid').rejects()
      chai.expect(salesController.add({}, {})).to.be.eventually.rejected;
    })
    
    it('Should return error if "salesService.addProduct" fails', () => {
      sinon.stub(salesService, 'validateBodyAddProduct').resolves();
      sinon.stub(productService, 'listByid').resolves(1);
      sinon.stub(salesService, 'addProduct').rejects;
      chai.expect(salesController.add({}, {})).to.be.eventually.rejected;
    });

    it('Should return a "res" with "status" 201 and a json', async () => {
     
      // const res = {};
      // res.status = sinon.stub().returns(res);
      // res.json = sinon.stub().returns();
      
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      
      const req = {};

      req.body = [
        {
          "productId": 1,
          "quantity": 1
        }
      ];
      const item = {
        "id": 46,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 1
          }
        ]
      };
      sinon.stub(salesService, 'validateBodyAddProduct').resolves({});
      sinon.stub(productService, 'listByid').resolves({});
      sinon.stub(salesService, 'addProduct').resolves({});
      await salesController.add(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(201);
      chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal({})
    })
  })
})