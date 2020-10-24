const express = require('express');

const router = require('./routers/checkout');

const app = express();

app.use('/checkout', router);

module.exports = app;
