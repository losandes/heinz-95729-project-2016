/*global define*/
define('models/book', { init: function (ko, Product) {
    "use strict";
    
    if (!ko) {
        throw new Error('Argument Exception: ko is required to init the book module');
    }
    
    if (typeof Product !== 'function') {
        throw new Error('Argument Exception: Product is required to init the book module');
    }
    
    var Book = function (book) {
        var $this = this;
        book = book || {};
        
        $this.setProductData($this, book);
        
        $this.thumbnailLink = ko.observable(book.thumbnailLink || '/images/books/default.png');
        $this.authors = ko.observableArray();
        $this.reviews = ko.observableArray();
        
        $this.detailsLink = ko.computed(function () {
            return '/books/' + $this.uid();
        });
    };
    
    Book.prototype = new Product();
    
    return Book;
}});
