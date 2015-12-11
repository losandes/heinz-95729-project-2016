module.exports.name = 'Cart';
module.exports.dependencies = ['Blueprint', 'ObjectID', 'exceptions'];
module.exports.factory = function (Blueprint, ObjectID, exceptions) {
    'use strict';

    var Cart = {};
    Cart = function(cart) {
        self.totalAmount = cart.totalAmount;
        self.books = cart.books;
        self.addToCart = function (book) {
            return self;
        };

        self.deleteFromCart = function (book) {
            return self;
        };

    return Cart;

    }
}