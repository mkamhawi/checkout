module.exports = {
  express: {
    port: process.env.EXPRESS_PORT || 3000
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  },
  store: {
    timezone: process.env.STORE_TIMEZONE || 'Africa/Cairo',
    defaultCurrency: process.env.DEFAULT_CURRENCY || 'EGP'
  },
  constants: {
    orderStatus: {
      placed: 'placed',
      approved: 'approved',
      delivered: 'delivered'
    }
  },
  cart: {
    url: process.env.CART_URL || 'http://localhost:4000/cart',
    apiKey: process.env.CART_API_KEY || 'api-key'
  },
  promotion: {
    url: process.env.PROMOTION_URL || 'http://localhost:4000/promotion',
    apiKey: process.env.PROMOTION_API_KEY || 'api-key'
  },
  payment: {
    url: process.env.PAYMENT_URL || 'http://localhost:4000/payment',
    apiKey: process.env.PAYMENT_API_KEY || 'api-key'
  },
  database: {
    url: process.env.DB_SERVICE_URL || 'http://localhost:4000/dbs',
    apiKey: process.env.DBS_API_KEY || 'api-key'
  }
};
