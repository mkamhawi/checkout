const { heads: { RoboHydraHead } } = require('robohydra');
const promotionResponses = require('../../../samples/responses/promotion');

exports.getBodyParts = () => ({
  heads: [
    new RoboHydraHead({
      path: '/promotion/:promocode',
      method: 'GET',
      handler(req, res) {
        const promotion = Object.values(promotionResponses)
          .find((p) => p.promocode === req.params.promocode);
        if (!promotion) {
          res.statusCode = 404;
          return res.end();
        }
        res.statusCode = 200;
        return res.send(JSON.stringify(promotion));
      }
    })
  ]
});
