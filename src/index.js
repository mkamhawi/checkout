const express = require('express');
const { middlewares } = require('../utils');

const router = require('./routers/checkout');

const app = express();

app.use(middlewares.parseRequest());
app.use('/checkout', router);

module.exports = app;
