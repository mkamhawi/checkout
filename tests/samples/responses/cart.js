const iphone = {
  productId: '21b5b349-4a28-48b1-9f1c-6213ebbf7f5c',
  name: 'iphone 12 pro',
  category: 'electronics',
  seller: 'Apple',
  price: 20000,
  currency: 'EGP',
  quantity: 1,
  isPremium: true
};

const airPods = {
  productId: 'b4311fc8-f53d-4275-8ecd-ae9ebed320a8',
  name: 'airPods pro',
  category: 'electronics',
  seller: 'Apple',
  price: 3000,
  currency: 'EGP',
  quantity: 1,
  isPremium: true
};

const novel = {
  productId: '0c83c15a-72bb-41ad-9bf7-107baace10fb',
  name: 'a tale of two cities',
  category: 'books',
  seller: 'Penguin Books',
  price: 100,
  currency: 'EGP',
  quantity: 2,
  isPremium: false
};

module.exports = {
  mixedProducts: {
    products: [
      iphone,
      novel
    ]
  },
  premiumProducts: {
    products: [
      iphone,
      airPods
    ]
  },
  nonPremiumProducts: {
    products: [
      novel
    ]
  }
};