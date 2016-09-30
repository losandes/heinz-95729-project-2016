Hilary.scope('heinz').register({
    name: 'Book',
    singleton: true,
    dependencies: ['router','ko', 'Product'],
    factory: function (router,ko, Product) {
        'use strict';

        var Book = function (book) {
            var self = new Product(book);

            self.thumbnailLink = ko.observable(book.thumbnailLink || '/images/books/default.png');
            self.reviews = ko.observableArray();
            self.price.click = function () {
              console.log("Inside book click:"+book.uid);
              router.navigate('/product?product='+book.uid);
                  };
            return self;
        };

        return Book;
    }
});
