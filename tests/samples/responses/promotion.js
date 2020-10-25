const moment = require('moment');

module.exports = {
  activepromotion: {
    promocode: 'code42',
    discountPercentage: 10,
    startDate: moment().subtract(2, 'Days').format('YYYY-MM-DD'),
    endDate: moment().add(3, 'Days').format('YYYY-MM-DD')
  },
  expiredpromotion: {
    promocode: 'code33',
    discountPercentage: 10,
    startDate: moment().subtract(10, 'Days').format('YYYY-MM-DD'),
    endDate: moment().subtract(5, 'Days').format('YYYY-MM-DD')
  }
};
