const express = require('express');
const { logger } = require('../../utils');
const Order = require('../controllers/Order');

const router = express.Router();

router.post('/order', async (req, res, next) => {
  try {
    logger.info({ message: `Order placed for cart ${req.body.cartId}` });
    const order = new Order(req.body);
    const response = await order.place();
    res.status(200).json(response);
    return next();
  } catch (error) {
    logger.debug({ message: `error placing order: ${error.message}` });
    return next(error);
  }
});

module.exports = router;
