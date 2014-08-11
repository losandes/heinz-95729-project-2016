/*global define*/
define('models/book', { init: function (ko, Product) {
    "use strict";
    
    if (!ko) {
        throw new Error('the book model requires ko');
    }
    
    var Book;
        
    Book = function (book) {
        var $this = this;
        book = book || {};
        
        $this.setProductData($this, book);
        
        $this.thumbnailLink = ko.observable(book.thumbnailLink || '/images/books/default/folder.png');
        $this.authors = [];
        $this.reviews = [];
    };
    
    Book.prototype = new Product();
    
    return Book;
}});