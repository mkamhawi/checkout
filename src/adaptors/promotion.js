const rp = require('request-promise');
const { logger } = require('../../utils');
const { promotion } = require('../config');

const getPromotionDetails = async (promocode) => {
  try {
    logger.info({ message: `Getting promotion details by promocode ${promocode}` });
    const response = await rp({
      url: `${promotion.url}/${promocode}`,
      method: 'GET',
      headers: {
        'x-api-key': promotion.apiKey
      },
      json: true
    });
    return response;
  } catch (error) {
    logger.info({ message: `Error (${error.statusCode}) calling promotion microservice` });
    throw error;
  }
};

module.exports = {
  getPromotionDetails
};
