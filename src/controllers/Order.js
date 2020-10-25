const moment = require('moment-timezone');
const { store, constants } = require('../config');
const {
  logger,
  errors: {
    InvalidRequestError,
    ServerError
  }
} = require('../../utils');
const {
  cartAdaptor,
  promotionAdaptor
} = require('../adaptors');

module.exports = class Order {
  constructor(payload) {
    this.orderAudit = {
      cartId: payload.cartId,
      cardId: payload.cardId,
      shippingDate: moment(payload.shippingDate).tz(store.timezone).format('YYYY-MM-DD'),
      promocode: payload.promocode,
      status: payload.status || constants.orderStatus.placed
    };
  }

  async getCart() {
    try {
      return await cartAdaptor.getCart(this.orderAudit.cartId);
    } catch (error) {
      logger.debug(error);
      throw new ServerError('Unexpected error');
    }
  }

  async getPromotionDetails() {
    try {
      return await promotionAdaptor.getPromotionDetails(this.orderAudit.promocode);
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

  getDiscountPercentage() {
    const today = moment().tz(store.timezone);
    if (
      this.promotion
      && today.diff(this.promotion.startDate, 'days') >= 0
      && moment(this.promotion.endDate).diff(today, 'days') >= 0
    ) {
      return parseFloat(this.promotion.discountPercentage) / 100;
    }
    return 0;
  }

  calculateTotalAmount() {
    const discountPercentage = this.getDiscountPercentage();
    return this.cart.products.reduce((total, item) => {
      const itemTotal = item.quantity * item.price;
      // eslint-disable-next-line no-param-reassign
      total += item.isPremium ? itemTotal : (1 - discountPercentage) * itemTotal;
      return total;
    }, 0);
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
      this.cart = await this.getCart();
      if (this.orderAudit.promocode) {
        this.promotion = await this.getPromotionDetails();
      }
      this.totalAmount = this.calculateTotalAmount();
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }
};
