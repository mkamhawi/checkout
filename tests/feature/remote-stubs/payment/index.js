const { heads: { RoboHydraHead } } = require('robohydra');
const { successfulPayment } = require('../../../samples/responses/payment');

exports.getBodyParts = () => ({
  heads: [
    new RoboHydraHead({
      path: '/payment',
      method: 'POST',
      handler(req, res) {
        res.statusCode = 200;
        return res.send(JSON.stringify(successfulPayment));
      }
    })
  ]
});
