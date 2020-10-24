const bunyan = require('bunyan');
const config = require('../config');

const logInstance = bunyan.createLogger({
  name: 'webstore',
  level: config.logging.level
});

module.exports = {
  logger: logInstance
};
