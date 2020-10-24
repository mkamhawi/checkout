const { expect } = require('chai');
const moment = require('moment-timezone');
const {
  store
} = require('../../../src/config/index');
const {
  errors: {
    InvalidRequestError
  }
} = require('../../../utils');
const Order = require('../../../src/controllers/Order');

const initializeOrder = (payload) => new Order(payload);

const sampleRequest = {
  cartId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  cardId: '77885477-8089-1142-33ee-00963a55a347',
  shippingDate: moment().tz(store.timezone).add(4, 'days').format()
};

describe('Order controller tests', () => {
  context('Validating orders', () => {
    it('Should throw invalid request error if a required param is missing', async () => {
      const input = {
        ...sampleRequest
      };
      delete input.cardId;
      const order = initializeOrder(input);
      try {
        await order.place();
        throw new Error();
      } catch (error) {
        expect(error).to.be.instanceOf(InvalidRequestError);
        expect(error.details).to.be.eql('Missing required params');
      }
    });

    it('Should throw invalid request error if the shipping date is invalid', async () => {
      const input = {
        ...sampleRequest,
        shippingDate: moment().tz(store.timezone).format()
      };
      const order = initializeOrder(input);
      try {
        await order.place();
        throw new Error();
      } catch (error) {
        expect(error).to.be.instanceOf(InvalidRequestError);
        expect(error.details).to.be.eql('Invalid shipping date');
      }
    });
  });
});
