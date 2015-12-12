module.exports.name = 'Cart';
module.exports.dependencies = ['Blueprint', 'ObjectID', 'exceptions'];
module.exports.factory = function (Blueprint, ObjectID, exceptions) {
    'use strict';

    var Cart = {};
    Cart = function(cart) {
        self.totalAmount = cart.totalAmount;
        self.books = cart.books;
        self.user = cart.user;
        self.addToCart = function (book) {
             var inCart = false;
             var i;
            for (i = 0; i < self.books.length; i++) {
                if (self.books[i].uid == book.uid) {
                    inCart = true;
                    self.books[i].amountofBooks = self.books[i].amountofBooks + 1;
                    break;
                }
                else {
                  inCart = false;
                    continue;
                }
            }
            if (inCart == false) {
                book.amountofBooks = 1;
                self.books.push(book);
            }
            self.totalAmount = self.totalAmount + book.price;
            return self;

        };

        self.deleteFromCart = function (book) {
            var i;
            for (i = 0; i < self.books.length; i ++) {
                if (self.books[i].uid == book.uid) {
                    self.books.splice(i, 1);
                }
            return self;
        };

        return Cart;

    }；
