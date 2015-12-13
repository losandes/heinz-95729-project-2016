/**
 * Created by willQian on 2015/12/3.
 */
module.exports.name = 'Cart';
module.exports.dependencies = ['Blueprint', 'ObjectID', 'exceptions'];
module.exports.factory = function (Blueprint, ObjectID, exceptions) {
    'use strict';

    var Cart = {};

     // This is the Product constructor, which will be returned by this factory
    Cart = function (cart) {
        // often times, we use selfies to provide a common object on which
        // to define properties. It's also common to see `var self = this`.
        var self = {
            addToCart: undefined,
            deleteOneFromCart: undefined,
            deleteFromCart: undefined
        };
        

        // define the Product properties from the product argument
        self.totalAmount = cart.totalAmount;
        self.books = cart.books;
        self.addToCart = function (book) {
            var isInCart = false;
            var i;
            for (i = 0; i < self.books.length; i++) {
                if (self.books[i].uid !== book.uid) {
                    isInCart = false;
                    continue;
                } else {
                    isInCart = true;
                    self.books[i].amountofBooks = self.books[i].amountofBooks + 1;
                    break;
                }
            }
            if (isInCart === false) {
                book.amountofBooks = 1;
                self.books.push(book);
            }
            self.totalAmount = self.totalAmount + book.price;
            return self;
        };

        self.deleteOneFromCart = function (book) {
            var i;
            for (i = 0; i < self.books.length; i++) {
                if (self.books[i].uid !== book.uid) {
                    continue;
                } else {
                    if (self.books[i].amountofBooks === 1) {
                        self.deleteFromCart(book);
                        break;
                    } else {
                        self.books[i].amountofBooks = self.books[i].amountofBooks - 1;
                        break;
                    }
                }
            }
            self.totalAmount = self.totalAmount - book.price;
            return self;
        };

        self.deleteFromCart = function (book) {
            var i;
            for (i = 0; i < self.books.length; i++) {
                if (self.books[i].uid !== book.uid) {
                    continue;
                } else {
                    self.books.splice(i, 1);
                }
            }
            return self;
        };
        self.cleanCart = function () {
            self.books = [];
            self.totalAmount = 0;
            return self;
        };
        return self;
    };

    return Cart;
};
