Hilary.scope('heinz').register({
    name: 'Book',
    singleton: true,
    dependencies: ['ko', 'Product'],
    factory: function (ko, Product) {
        'use strict';

        var Book = function (book) {
            var self = new Product(book);
            //console.log( self.buyABook);
            self.thumbnailLink = ko.observable(book.thumbnailLink || '/images/books/default.png');
            self.reviews = ko.observableArray();
            self.amountofBooks = ko.observable(book.amountofBooks || undefined);
            return self;
        };

        return Book;
    }
});
