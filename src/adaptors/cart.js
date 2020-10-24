const rp = require('request-promise');
const { logger } = require('../../utils');
const { cart } = require('../config');

const getCart = async (cartId) => {
  try {
    logger.info({ message: `Getting cart by cartId ${cartId}` });
    const response = await rp({
      url: `${cart.url}/${cartId}`,
      method: 'GET',
      headers: {
        'x-api-key': cart.apiKey
      },
      json: true
    });
    return response;
  } catch (error) {
    logger.info({ message: `Error (${error.statusCode}) calling cart microservice` });
    throw error;
  }
};

module.exports = {
  getCart
};
