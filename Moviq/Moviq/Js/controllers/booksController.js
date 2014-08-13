/*global define*/
define('controllers/booksController', { init: function ($, routes, viewEngine, Books) {
    "use strict";

    routes.get(/^\/books\/?/i, function (context) {  // /books
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
