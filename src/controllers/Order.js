const moment = require('moment-timezone');
const uuid = require('uuid').v4;
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
  promotionAdaptor,
  paymentAdaptor,
  databaseAdaptor
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

  async chargeCreditCard() {
    try {
      return await paymentAdaptor.chargeCreditCard(
        this.orderAudit.cartId,
        this.totalAmount,
        store.defaultCurrency
      );
    } catch (error) {
      logger.debug(error);
      throw new ServerError('Unexpected error');
    }
  }

  async saveOrderAudit() {
    try {
      return await databaseAdaptor.saveOrder(this.orderAudit);
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
      const itemTotal = item.quantity * item.unitPrice.amount;
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
    if (this.cart) {
      this.cart.products.forEach((item) => {
        if (item.unitPrice.currency !== store.defaultCurrency) {
          throw new ServerError('unimplemented feature');
        }
      });
    }
  }

  approveOrder() {
    this.orderAudit.orderId = uuid();
    this.orderAudit.transactionId = this.paymentReceipt.transactionId;
    this.orderAudit.status = constants.orderStatus.approved;
  }

  async place() {
    try {
      this.cart = await this.getCart();
      this.validateOrder();
      if (this.orderAudit.promocode) {
        this.promotion = await this.getPromotionDetails();
      }
      this.totalAmount = this.calculateTotalAmount();
      this.paymentReceipt = await this.chargeCreditCard();
      this.approveOrder();
      await this.saveOrderAudit();
      logger.info({ message: 'saved order audit' });
      return {
        orderId: this.orderAudit.orderId,
        transactionId: this.orderAudit.transactionId
      };
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  }
};
