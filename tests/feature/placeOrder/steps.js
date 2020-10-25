const { expect } = require('chai');
const {
  Given,
  When,
  Then
} = require('cucumber');
const rp = require('request-promise');

Given('The cartId is {string}', (cartId) => {
  this.cartId = cartId;
});

Given('The cardId is {string}', (cardId) => {
  this.cardId = cardId;
});

Given('The shippingDate is {string}', (shippingDate) => {
  this.shippingDate = shippingDate;
});

When('I call POST order route', async () => {
  try {
    const body = {
      cartId: this.cartId,
      cardId: this.cardId,
      shippingDate: this.shippingDate
    };

    this.response = await rp({
      url: 'http://localhost:3000/checkout/order',
      method: 'POST',
      body,
      json: true,
      resolveWithFullResponse: true
    });
  } catch (error) {
    this.response = error;
  }
});

Then('The POST order route returns statusCode {int}', (statusCode) => {
  expect(this.response.statusCode).to.be.eql(statusCode);
});

Then('The response contains expected params', () => {
  expect(this.response.body).to.haveOwnProperty('orderId');
  expect(this.response.body).to.haveOwnProperty('transactionId');
});
