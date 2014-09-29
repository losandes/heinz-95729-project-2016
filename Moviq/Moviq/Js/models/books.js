/*jslint plusplus: true*/
/*global define*/
define('models/books', { init: function (ko, Book) {
    "use strict";
    
    if (!ko) {
        throw new Error('Argument Exception: ko is required to init the books module');
    }
    
    if (!Book) {
        throw new Error('Argument Exception: Book is required to init the books module');
    }
    
    var Books;

    Books = function (books) {
        var $this = this;
        
        $this.books = ko.observableArray();
        
        $this.addBook = function (book) {
            if (!book) {
                throw new Error('Argument Exception: the argument, book, must be defined to add a book');
            }
            
            var i = 0;
            
            if (!(book instanceof Book)) {
                book = new Book(book);
            }
            
            $this.books.push(book);
        };
        
        $this.addBooks = function (books) {
            if (!books) {
                throw new Error('Argument Exception: the argument, books, must be defined to add books');
            }
            
            var i = 0;
            
            for (i; i < books.length; i++) {
                $this.addBook(books[i]);
            }
        };
        
        if (books) {
            $this.addBooks(books);
        }
    };
    
    return Books;
}});
