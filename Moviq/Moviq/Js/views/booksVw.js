/**/
/*global define*/
define('views/booksVw', { init: function ($, routes) {
    "use strict";
    
    // add singleton events
    $(document).on('submit', 'form.book-search', function (event) {
        routes.navigate('/books/search/?q=' + $('.book-search input').val());
    });
}});
