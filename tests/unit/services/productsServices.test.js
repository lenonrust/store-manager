const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const chai = require('chai');
const productService = require('../../../services/productService');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('services/productServices', () => {

  beforeEach(sinon.restore);

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
  })
});