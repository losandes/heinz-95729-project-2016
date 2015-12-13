/**
 * Created by willQian on 2015/12/3.
 */
Hilary.scope('heinz').register({
    name: 'CartVM',
    singleton: true,
    dependencies: ['ko', 'Book', 'exceptions'],
    factory: function (ko, Book, exceptions) {
        'use strict';

        var Cart = function (user) {
            var self = {};
            self.books = ko.observableArray();
            self.totalAmount = ko.observable(user.cart.totalAmount.toFixed(2));

            self.addCart = function (book) {
                if (!book) {
                    exceptions.throwArgumentException('The argument, book, must be defined to add a book', 'book');
                    return;
                }

                self.books.push(new Book(book));
            };

            // TODO: (Optimization) By adding items to the observableArray one
            // at a time, significantly more compute is required than if we
            // add them to a JS array and then set the value of self.books.
            self.addCarts = function (books) {
                if (!books) {
                    exceptions.throwArgumentException('The argument, books, must be defined to add books', 'books');
                    return;
                }

                var i;

                for (i = 0; i < books.length; i += 1) {
                    console.log("books.length--->" + books.length);
                    self.addCart(books[i]);
                }
            };

            if (user.cart.books) {
                self.addCarts(user.cart.books);
                localStorage.setItem('cart',JSON.stringify(user.cart));
            }

            return self;
        };

        return Cart;

    }
});
