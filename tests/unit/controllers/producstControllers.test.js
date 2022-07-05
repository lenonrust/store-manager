const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

describe('controllers/productControllers', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('Should return an error ', () => {
      sinon.stub(productService, 'list').rejects();
      const result = productController.list({}, {});
      chai.expect(result).to.eventually.be.rejected;
    });
    it('Should return an Object', () => {
      sinon.stub(productService, 'list').resolves();
      const result = productController.list({}, {});
      chai.expect(result).to.eventually.be.instanceOf(Object);
    })
  });
  describe('listById', () => {
    it('Should return status and object', async () => {
      
      const req = {params: { id: 1 }};
      
      const item = {
        "id": 1,
        "name": "Martelo de Thor"
      };

      const res = {
      status: sinon.stub().callsFake(() => res),
      json: sinon.stub().returns(),
     }
      sinon.stub(productService, 'listByid').resolves(item);
      await productController.listByid(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal(item)
      
    })
    it('Should return an error 404', async () => {
      const res = {
      status: sinon.stub().callsFake(() => res),
      json: sinon.stub().returns(),
      }

      sinon.stub(productService, 'listByid').rejects();
      const result = await productController.listByid({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(404);
    })
  })
  describe('add', () => {
    it('Should return an error if productService.validateBodyAdd fails', () => {
      sinon.stub(productService, 'validateBodyAdd').rejects();
      chai.expect(productController.add({}, {})).to.be.eventually.rejected;
    })
    it('Should return an error if productService.add fails', () => {
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'add').rejects();
      chai.expect(productController.add({}, {})).to.be.eventually.rejected;
    })
    it('Should return an error if productService.listByid fails', () => {
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'add').resolves();
      sinon.stub(productService, 'listByid').rejects();
      chai.expect(productController.add({}, {})).to.be.eventually.rejected;
    })
    it('Should call "res" with "status 201" and a "json"', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'add').resolves();
      sinon.stub(productService, 'listByid').resolves({ id: 1 });
      await productController.add({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(201);
      chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal({ id: 1 })
    })
    
  })
})