/*global define, JSON*/
define('controllers/booksController', { init: function ($, routes, viewEngine, Books, Book,Cart) {
    "use strict";

    // GET /books/search/?q=searchterm
    // search for a book or books
    routes.get(/^\/#\/books\/search\/?/i, function (context) {  // /books ///^\/#books\/search\/(\w+)\/?/i
        $.ajax({
            url: '/api/books/search/?q=' + context.params.q,
            method: 'GET'
        }).done(function (data) {
            var books = new Books(JSON.parse(data));

            if (books.books().length > 0) {
                viewEngine.setView({
                    template: 't-book-grid',
                    data: books
                });
            } else {
                viewEngine.setView({
                    template: 't-no-results',
                    data: { searchterm: context.params.q }
                });
            }
        });
    });
    
    // GET /books/42
    // Get the details for a single book
    // must precede /books in the route catalog, or /books will match first
    routes.get(/^\/#\/book\/(\w+)\/?/i, function (context) {  // /books
        $.ajax({
            url: '/api/books/' + context.params.splat[0]
        }).done(function (data) {
            var book = new Book(JSON.parse(data));
            
            viewEngine.setView({
                template: 't-book-details',
                data: { book: book }
            });

        });
    });

    // GET /books/
    // Get a list of books
    routes.get(/^\/#\/books\/?/i, function (context) {  // /books

        viewEngine.setView({
            template: 't-book-search'
        });

        //$.ajax({
        //    url: '/api/books/'
        //}).done(function (data) {
        //    var books = new Books(JSON.parse(data));
            
        //    viewEngine.setView({
        //        template: 't-book-grid',
        //        data: books
        //    });

        //});
    });
    
}});
