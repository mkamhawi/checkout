const rp = require('request-promise');
const { logger } = require('../../utils');
const { database } = require('../config');

const saveOrder = async (payload) => {
  try {
    logger.info({ message: `Committing order ${payload.orderId}` });
    const response = await rp({
      url: `${database.url}/orders`,
      method: 'POST',
      headers: {
        'x-api-key': database.apiKey
      },
      body: payload,
      json: true
    });
    return response;
  } catch (error) {
    logger.info({ message: `Error (${error.statusCode}) calling database access service` });
    throw error;
  }
};

module.exports = {
  saveOrder
};
