const moment = require('moment-timezone');
const { store, constants } = require('../config');
const {
  logger,
  errors: {
    InvalidRequestError,
    ServerError
  }
} = require('../../utils');
const { cartAdaptor } = require('../adaptors');

module.exports = class Order {
  constructor(payload) {
    this.orderAudit = {
      cartId: payload.cartId,
      cardId: payload.cardId,
      shippingDate: moment(payload.shippingDate).tz(store.timezone).format('YYYY-MM-DD'),
      status: payload.status || constants.orderStatus.placed
    };
  }

  async getCart() {
    try {
      this.cart = await cartAdaptor.getCart(this.orderAudit.cartId);
    } catch (error) {
      logger.debug(error);
      throw new ServerError('Unexpected error');
    }
  }

  isMissingRequiredParams() {
    return !this.orderAudit.cartId || !this.orderAudit.cardId;
  }

  isValidShippingDate() {
    const today = moment().tz(store.timezone);
    return moment(this.orderAudit.shippingDate).diff(today, 'days') > 2;
  }

  validateOrder() {
    if (this.isMissingRequiredParams()) {
      throw new InvalidRequestError('Missing required params');
    }
    if (!this.isValidShippingDate()) {
      throw new InvalidRequestError('Invalid shipping date');
    }
  }

  async place() {
    try {
      this.validateOrder();
      this.getCart();
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }
};
