const { expect } = require('chai');
const moment = require('moment-timezone');
const nock = require('nock');
const {
  cartResponses,
  promotionResponses
} = require('../../samples/responses');
const {
  store,
  cart
} = require('../../../src/config');
const {
  errors: {
    InvalidRequestError,
    ServerError
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
  context('#validateOrder failures', () => {
    it('Should throw invalid request error if a required param is missing', () => {
      const payload = {
        ...sampleRequest
      };
      delete payload.cardId;
      const order = initializeOrder(payload);
      try {
        order.validateOrder();
        throw new Error();
      } catch (error) {
        expect(error).to.be.instanceOf(InvalidRequestError);
        expect(error.details).to.be.eql('Missing required params');
      }
    });

    it('Should throw invalid request error if the shipping date is invalid', () => {
      const payload = {
        ...sampleRequest,
        shippingDate: moment().tz(store.timezone).format()
      };
      const order = initializeOrder(payload);
      try {
        order.validateOrder();
        throw new Error();
      } catch (error) {
        expect(error).to.be.instanceOf(InvalidRequestError);
        expect(error.details).to.be.eql('Invalid shipping date');
      }
    });
  });

  context('#getCart failures', () => {
    beforeEach(() => {
      nock.cleanAll();
    });

    it('Should throw server error if cart is not found', async () => {
      const payload = {
        ...sampleRequest
      };
      const order = initializeOrder(payload);
      const cartNock = nock(cart.url)
        .get(`/${payload.cartId}`)
        .reply(404, { message: 'Resource not found' });
      try {
        await order.getCart();
        throw new Error();
      } catch (error) {
        expect(error).to.be.instanceOf(ServerError);
        cartNock.done();
      }
    });
  });

  context('#calculateTotalAmount', () => {
    it('Should calculate total correctly if no promotion is found', () => {
      const order = initializeOrder(sampleRequest);
      Object.assign(order, {
        cart: cartResponses.mixedProducts
      });
      const totalAmount = order.calculateTotalAmount();
      expect(totalAmount).to.be.eql(20200);
    });

    it('Should calculate total correctly if promotion is expired', () => {
      const order = initializeOrder(sampleRequest);
      Object.assign(order, {
        promotion: promotionResponses.expiredpromotion,
        cart: cartResponses.mixedProducts
      });
      const totalAmount = order.calculateTotalAmount();
      expect(totalAmount).to.be.eql(20200);
    });

    it('Should calculate total correctly if a promotion is active', () => {
      const order = initializeOrder(sampleRequest);
      Object.assign(order, {
        promotion: promotionResponses.activepromotion,
        cart: cartResponses.mixedProducts
      });
      const totalAmount = order.calculateTotalAmount();
      expect(totalAmount).to.be.eql(20180);
    });

    it('Should ignore an active promotion for premium items', () => {
      const order = initializeOrder(sampleRequest);
      Object.assign(order, {
        promotion: promotionResponses.activepromotion,
        cart: cartResponses.premiumProducts
      });
      const totalAmount = order.calculateTotalAmount();
      expect(totalAmount).to.be.eql(23000);
    });
  });
});
