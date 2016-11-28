module.exports = [
    require('./books/Book.js'),
    require('./middleware/authenticationMiddleware.js'),
    require('./products/Product.js'),
    require('./products/productsRepo.js'),
    require('./users/User.js'),
    require('./users/usersRepo.js'),
    require('./checkout/checkout.js'),
    require('./checkout/checkoutRepo.js')
];
