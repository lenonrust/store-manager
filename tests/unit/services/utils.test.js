const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Joi = require('joi');
const { runSchema } = require('../../../services/utils');

chai.use(chaiAsPromised);

describe('services/utils', () => {
  beforeEach(sinon.restore);
  const schema = Joi.object();

  describe('runSchema', () => {
    it('Should return error if "Joi" returns error ', () => {
      sinon.stub(schema, 'validateAsync').rejects();
      chai.expect(runSchema(schema)({})).to.eventually.be.rejected;
    });
    it('Should return an object from "Joi"', () => {
      sinon.stub(schema, 'validateAsync').resolves({});
      chai.expect(runSchema(schema)({})).to.eventually.deep.equal({});
    });
  });
});