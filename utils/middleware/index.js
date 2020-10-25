const bodyParser = require('body-parser');
const { logger } = require('../logger');

const jsonMiddleware = bodyParser.json();

const parseRequest = () => (req, res, next) => {
  jsonMiddleware(req, res, (err) => {
    if (err) {
      logger.info({ message: 'unexpected error parsing body' });
      req.body = null;
    }
    next();
  });
};

module.exports = {
  parseRequest
};
