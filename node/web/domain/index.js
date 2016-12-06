module.exports = [
    require('./books/Book.js'),
    require('./middleware/authenticationMiddleware.js'),
    require('./products/Product.js'),
    require('./products/productsRepo.js'),
    require('./users/User.js'),
    require('./users/usersRepo.js'),
    require('./checkout/Checkout.js'),
    require('./checkout/checkoutRepo.js'),
    require('./orderHistory/Order.js'),
    require('./orderHistory/orderHistoryRepo.js')
];
