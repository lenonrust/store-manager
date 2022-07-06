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
      
      const req = { params: { id: 1 } };
      
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
  });
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
    
  });
  describe('update', () => {
    it('Should return error if productService.validateBodyAdd fails', () => {
      sinon.stub(productService, 'validateBodyAdd').rejects();
      chai.expect(productController.update({}, {})).to.be.eventually.rejected;
    });
    it('Should return error if productService.validateBodyEdit fails', () => {
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'validateBodyEdit').rejects();
      chai.expect(productController.update({}, {})).to.be.eventually.rejected;
    });
    it('Should return error if productService.checkExist fails', () => {
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'validateBodyEdit').resolves();
      sinon.stub(productService, 'checkExist').rejects();
      chai.expect(productController.update({}, {})).to.be.eventually.rejected;
    });
    it('Should return error if productService.update fails', () => {
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'validateBodyEdit').resolves();
      sinon.stub(productService, 'checkExist').resolves();
      sinon.stub(productService, 'update').rejects();
      chai.expect(productController.update({}, {})).to.be.eventually.rejected;
    });
    it('Should return error if productService.lisById fails', () => {
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'validateBodyEdit').resolves();
      sinon.stub(productService, 'checkExist').resolves();
      sinon.stub(productService, 'update').resolves();
      sinon.stub(productService, 'listByid').rejects();
      chai.expect(productController.update({}, {})).to.be.eventually.rejected;
    });
    it('Should return an Object in case of success', async () => {
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'validateBodyEdit').resolves();
      sinon.stub(productService, 'checkExist').resolves();
      sinon.stub(productService, 'update').resolves();
      sinon.stub(productService, 'listByid').resolves({});
      
      const req = { params: { id: 2 , name: "Martelo do Batman" } };

      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await productController.update(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.be.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal({})
    });
  });
  describe('remove', () => {
    it('Should return an error if "productService.checkExist" fails', () => {
      sinon.stub(productService, 'checkExist').rejects();
      chai.expect(productController.remove({}, {})).to.be.eventually.rejected;
    });
    it('Should return an error if "productService.remove" fails', () => {
      sinon.stub(productService, 'checkExist').resolves();
      sinon.stub(productService, 'remove').rejects();
      chai.expect(productController.remove({}, {})).to.be.eventually.rejected;
    });
    it('Should call "res.sendStatus" with "status" 204', async () => {

      req = {params: {id: 1}}
      
      const res = {
        sendStatus: sinon.stub().returns(),
      };

      sinon.stub(productService, 'checkExist').resolves();
      sinon.stub(productService, 'remove').resolves();
      await productController.remove(req, res);
      chai.expect(res.sendStatus.getCall(0).args[0]).to.equal(204)
    });
  });
  describe('search', () => {
      
    
    it('Should return an error "productService.list" fails', () => {
      sinon.stub(productService, 'search').rejects();
      chai.expect(productController.search({},{})).to.eventually.be.rejected;
    });
    it(`Should call "productService.list" if "searchTerm" is empty and return 
    "res.Status" 200 with json`, () => {
      const req = { query: { q: '' } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      sinon.stub(productService, 'list').resolves({})
      chai.expect(productController.search(req, res)).to.eventually.be.deep.equal({})
    });
     it(`Should return an obejct if "productService.search" success`, () => {
      const req = { query: { q: 'Martelo' } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      sinon.stub(productService, 'search').resolves({});
      chai.expect(productController.search(req, res)).to.eventually.be.deep.equal({})
    });
    
  });
  
})