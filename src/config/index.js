module.exports = {
  express: {
    port: 3000
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  }
};
