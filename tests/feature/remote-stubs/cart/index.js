const { heads: { RoboHydraHead } } = require('robohydra');
const cartResponses = require('../../../samples/responses/cart');

exports.getBodyParts = () => ({
  heads: [
    new RoboHydraHead({
      path: '/cart/:cartId',
      method: 'GET',
      handler(req, res) {
        const cart = Object.values(cartResponses).find((c) => c.cartId === req.params.cartId);
        if (!cart) {
          res.statusCode = 404;
          return res.end();
        }
        res.statusCode = 200;
        return res.send(JSON.stringify(cart));
      }
    })
  ]
});
