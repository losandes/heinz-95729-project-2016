/*global define*/
define('controllers/booksController', { init: function ($, routes, viewEngine, Books, Book) {
    "use strict";
    
    // GET /books/42
    // Get the details for a single book
    // must precede /books in the route catalog, or /books will match first
    routes.get(/^\/#books\/(\d+)\/?/i, function (context) {  // /books
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
    routes.get(/^\/#books\/?/i, function (context) {  // /books
        $.ajax({
            url: '/api/books/'
        }).done(function (data) {
            var books = new Books(JSON.parse(data));
            
            viewEngine.setView({
                template: 't-book-grid',
                data: books
            });

        });
    });
    
}});
