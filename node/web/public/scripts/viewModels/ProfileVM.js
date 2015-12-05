/**
 * Created by willQian on 2015/12/5.
 */
Hilary.scope('heinz').register({
    name: 'ProfileVM',
    singleton: true,
    dependencies: ['ko', 'Book', 'exceptions'],
    factory: function (ko, Book, exceptions) {
        'use strict';

        var Profile = function (user) {
            var self = {};
            self.books = ko.observableArray();
            self.totalAmount = ko.observable(user.orderhistory.totalAmountOfHistory.toFixed(2));
            self.name = ko.observable(user.name);
            self.email = ko.observable(user.email);

            self.addOrderHistory = function (book) {
                if (!book) {
                    exceptions.throwArgumentException('The argument, book, must be defined to add a book', 'book');
                    return;
                }

                self.books.push(new Book(book));
            };

            // TODO: (Optimization) By adding items to the observableArray one
            // at a time, significantly more compute is required than if we
            // add them to a JS array and then set the value of self.books.
            self.addOrderHistories = function (books) {
                if (!books) {
                    exceptions.throwArgumentException('The argument, books, must be defined to add books', 'books');
                    return;
                }

                var i;

                for (i = 0; i < books.length; i += 1) {
                    console.log("books.length--->" + books.length);
                    self.addOrderHistory(books[i]);
                }
            };

            if (user.orderhistory.booksOfHistory) {
                self.addOrderHistories(user.orderhistory.booksOfHistory);
            }

            return self;
        };

        return Profile;

    }
});
