const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const chai = require('chai');
const productService = require('../../../services/productService');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('services/productServices', () => {

  beforeEach(sinon.restore);

  describe('checkExist', () => {
    it('Should return an error if "productModel.exist" fails', () => {
      sinon.stub(productModel, 'exist').rejects();
      chai.expect(productService.checkExist(0)).to.be.eventually.rejected;
    });
    it('Should return an error if "productModel.exist" returns false', () => {
      sinon.stub(productModel, 'exist').resolves(false);
      chai.expect(productService.checkExist(0)).to.eventually.be.rejectedWith('Product not found');
    });
     it('Should return undefined if "productModel.exist" returns true', () => {
      sinon.stub(productModel, 'exist').resolves(true);
      chai.expect(productService.checkExist(0)).to.eventually.be.undefined;
    });
  });

  describe('list', () => {
    it('should return a list of objects', async () => {
      const items = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]
      sinon.stub(productModel, 'list').resolves(items);
      const result = await productService.list();
      chai.expect(result).to.be.deep.equal(items);
    })
  });
  
  describe('listById', () => {
    it('Should resturn an object with id and name', async () => {
      const item = {
        "id": 1,
        "name": "Martelo de Thor"
      }
      sinon.stub(productModel, 'listByid').resolves(item);
      const result = await productService.listByid('1');
      chai.expect(result).to.be.deep.equal(item);
    })
    it('Should return "Product not found" if id doesn"t exist', () => {
      sinon.stub(productModel, 'listByid').resolves(false);
      const result = productService.listByid('a');
      chai.expect(result).to.eventually.throw(Error);
    })
  });
  
  describe('add', () => {

    const value = {
      name: "ProductX",
    }

    it('Should return an error if "productModel.add" fails', () => {
      sinon.stub(productModel, 'add').rejects();
      chai.expect(productService.add(value)).to.eventually.be.rejected;
    });
    it('Should return id from "productModel.add"', () => {
      sinon.stub(productModel, 'add').resolves(1);
      chai.expect(productService.add(value)).to.eventually.equal(1);
    });
  });
  describe('update', () => {
    it('Should return an error "productModel.update" fails', () => {
      sinon.stub(productModel, 'update').rejects();
      chai.expect(productService.update(0, {})).to.be.eventually.rejected;
    });
    it('Should return "undefined" "productModel.remove" success', () => {
      sinon.stub(productModel, 'update').resolves();
      chai.expect(productService.remove(0, {})).to.be.eventually.undefined;
    });
  });
  describe('remove', () => {
    it('Should return an error "productModel.remove" fails', () => {
      sinon.stub(productModel, 'remove').rejects();
      chai.expect(productService.remove(0)).to.be.eventually.rejected;
    });
    it('Should return "undefined" "productModel.remove" success', () => {
      sinon.stub(productModel, 'remove').resolves();
      chai.expect(productService.remove(0)).to.be.eventually.undefined;
  });
  });
});