const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesServices');
const productService = require('../../../services/productService');

chai.use(chaiAsPromised);

describe('controllers/salesController', () => {
  beforeEach(sinon.restore)
  
  describe('list', () => {
    it('Should return an error if "salesService.list" fails',() => {
      sinon.stub(salesService, 'list').rejects();
      chai.expect(salesController.list()).to.be.eventually.rejected;
    });
    it('Should return a "res" with "json" if success', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(salesService, 'list').resolves([{}]);
      await salesController.list({}, res);
      chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal([{}])
    });
  });

  describe('listByID', () => {
    it('Should return an error if "productService.listByid" fails', async () => {
      const res = {
      status: sinon.stub().callsFake(() => res),
      json: sinon.stub().returns(),
     }
      sinon.stub(salesService, 'listById').rejects();
      await salesController.listByid({}, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(404);
    });
    it('Should return an "Object" if success ', async () => {
      const req = {params: { id: 1 }};
      const res = {
      status: sinon.stub().callsFake(() => res),
      json: sinon.stub().returns(),
      }
      const item = [
        {
          date: "2022-07-05T14:21:19.000Z",
          productId: 1,
          quantity: 5
        }
      ];
        
      sinon.stub(salesService, 'listById').resolves(item);
      await salesController.listByid(req, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal(item)
    });
  });

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
  });
  describe('remove', () => {
    it('Should return an error if "salesService.checkExist" fails', () => {
      sinon.stub(salesService, 'checkExist').rejects();
      chai.expect(salesController.remove({}, {})).to.be.eventually.rejected;
    });
    it('Should return an error if "salesService.removeProduct" fails', () => {
      sinon.stub(salesService, 'checkExist').resolves();
      sinon.stub(salesService, 'removeProduct').rejects();
      chai.expect(salesController.remove({}, {})).to.be.eventually.rejected;
    });
     it('Should return an error if "salesService.remove" fails', () => {
      sinon.stub(salesService, 'checkExist').resolves();
      sinon.stub(salesService, 'removeProduct').resolves();
      sinon.stub(salesService, 'remove').resolves();
      chai.expect(salesController.remove({}, {})).to.be.eventually.rejected;
    });
    it('Should call "res.sendStatus" with "status" 204', async () => {

      req = {params: {id: 1}}
      
      const res = {
        sendStatus: sinon.stub().returns(),
      };

      sinon.stub(salesService, 'checkExist').resolves();
      sinon.stub(salesService, 'remove').resolves();
      await salesController.remove(req, res);
      chai.expect(res.sendStatus.getCall(0).args[0]).to.equal(204)
    });
  });
})