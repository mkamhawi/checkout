const { heads: { RoboHydraHead } } = require('robohydra');
const { saveAuditResponse } = require('../../../samples/responses/database');

exports.getBodyParts = () => ({
  heads: [
    new RoboHydraHead({
      path: '/dbs/orders',
      method: 'POST',
      handler(req, res) {
        res.statusCode = 200;
        return res.send(JSON.stringify(saveAuditResponse));
      }
    })
  ]
});
