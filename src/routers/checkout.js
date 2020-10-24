const express = require('express');
const { logger } = require('../../utils');

const router = express.Router();

router.post('/order', async (req, res, next) => {
  try {
    logger.info({ message: `Order placed for cart ${req.body.cartId}` });
    res.status(200).json({});
    return next();
  } catch (error) {
    logger.debug({ message: `error placing order: ${error.message}` });
    return next(error);
  }
});

module.exports = router;
