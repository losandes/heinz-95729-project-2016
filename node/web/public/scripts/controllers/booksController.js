Hilary.scope('heinz').register({
    name: 'booksController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'jQuery', 'Books', 'Book'],
    factory: function ($this, GidgetRoute, locale, viewEngine, $, Books, Book) {
        'use strict';

        // GET /books/search/?q=searchterm
        // search for a book or books
        $this.get['/books/search'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/books/search/?q=' + req.uri.query.q,
                    method: 'GET'
                }).done(function (data) {
                    var books = new Books(data);

                    if (books.books().length > 0) {
                        viewEngine.setVM({
                            template: 't-book-grid',
                            data: books
                        });
                    } else {
                        viewEngine.setVM({
                            template: 't-no-results',
                            data: { searchterm: req.uri.query.q }
                        });
                    }
                });
            }
        });

        // GET /books/42
        // Get the details for a single book
        // must precede /books in the route catalog, or /books will match first
        $this.get['/book/:uid'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/books/' + req.params.uid
                }).done(function (data) {
                    var book = new Book(data);

                    viewEngine.setVM({
                        template: 't-book-details',
                        data: { book: book }
                    });

                });
            }
        });
        $this.get['/book/:uid/addToCart'] = new GidgetRoute({
            routeHandler: function(err, req) {
                console.log('booksController get called');
                 $.ajax({
                    url: '/api/book/addToCart/' + req.params.uid,
                    method: 'GET'
                }).done(function (data) {
                    console.log('booksController done');
                   

                   if (data === 'noUser') {
                        window.alert('login first');
                    }
                   else {
                     var book = new Book(data);

                    viewEngine.setVM({
                        template: 't-cart',
                        data: { book: book }
                    });
                   }
                 });
                }
            });

        $this.get['/checkout'] = new GidgetRoute({
           routeHandler: function(err, req) {
                console.log('client checkout get called');
                 $.ajax({
                    url: '/api/checkout',
                    method: 'GET'
                }).done(function (data) {
                    console.log(data);
                    console.log('booksController done');
                    if (data === 'noUser') {
                        window.alert('login first');
                    }
                    else if (data == "emptyCart") {
                       // window.alert("cart is empty");
                       
                       viewEngine.setVM({
                          template: 't-empty', 
                          data: {}
                         });
                    }
                    //show the shopping cart
                    else {

                    }
                 });
                }
        });
        $this.get['/books'] = new GidgetRoute({
            routeHandler: function () {
                viewEngine.setVM({
                    template: 't-book-search'
                });
            }
        });
        return $this;
    }
});
