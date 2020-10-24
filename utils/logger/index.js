const bunyan = require('bunyan');
const config = require('../../src/config');

const logInstance = bunyan.createLogger({
  name: 'webstore',
  level: config.logging.level
});

module.exports = {
  logger: logInstance
};
