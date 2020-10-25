const rp = require('request-promise');
const { logger } = require('../../utils');
const { payment } = require('../config');

const chargeCreditCard = async (cardId, amount, currency) => {
  try {
    logger.info({ message: `Authorizing ${currency} ${amount} on card: ${cardId}` });
    const response = await rp({
      url: `${payment.url}`,
      method: 'POST',
      headers: {
        'x-api-key': payment.apiKey
      },
      body: {
        cardId,
        amount,
        currency
      },
      json: true
    });
    return response;
  } catch (error) {
    logger.info({ message: `Error (${error.statusCode}) calling payment microservice` });
    throw error;
  }
};

module.exports = {
  chargeCreditCard
};
