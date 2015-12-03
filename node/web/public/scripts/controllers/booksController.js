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
                $.ajax({
                    url: '/api/count',
                    method: 'GET'
                }).done(function (data) {
                  var cart = document.getElementById("cart");
                  cart.style.color = "#fff";
                  cart.style.background= "#ff0000";
                  cart.style.fontSize= "12px";
                  cart.style.padding = "0 5px";
                  cart.style.position = "absolute";
                  cart.style.marginLeft="-2px";
                  cart.style.verticalAlign = top;
                  cart.style.borderRadius = "50px 15px";
                  cart.innerHTML = "";
                  cart.appendChild(document.createTextNode(data));
                });
            }
        });

        // GET /books/
        // Get a list of books
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
