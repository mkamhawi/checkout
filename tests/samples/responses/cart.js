const iphone = {
  productId: '21b5b349-4a28-48b1-9f1c-6213ebbf7f5c',
  name: 'iphone 12 pro',
  category: 'electronics',
  seller: 'Apple',
  unitPrice: {
    amount: 20000,
    currency: 'EGP'
  },
  quantity: 1,
  isPremium: true
};

const airPods = {
  productId: 'b4311fc8-f53d-4275-8ecd-ae9ebed320a8',
  name: 'airPods pro',
  category: 'electronics',
  seller: 'Apple',
  unitPrice: {
    amount: 3000,
    currency: 'EGP'
  },
  quantity: 1,
  isPremium: true
};

const novel = {
  productId: '0c83c15a-72bb-41ad-9bf7-107baace10fb',
  name: 'a tale of two cities',
  category: 'books',
  seller: 'Penguin Books',
  unitPrice: {
    amount: 100,
    currency: 'EGP'
  },
  quantity: 2,
  isPremium: false
};

module.exports = {
  mixedProducts: {
    cartId: '9746d88d-8c5b-47d0-ade5-cce56a7ac781',
    products: [
      iphone,
      novel
    ]
  },
  premiumProducts: {
    cartId: '8814e056-614e-408d-94d7-af6e7c5c8184',
    products: [
      iphone,
      airPods
    ]
  },
  nonPremiumProducts: {
    cartId: '6029ea11-793b-42be-9c28-ba2826b8f658',
    products: [
      novel
    ]
  }
};
