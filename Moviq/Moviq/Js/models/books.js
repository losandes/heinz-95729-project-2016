/*jslint plusplus: true*/
/*global define*/
define('models/books', { init: function (ko, Book, Author) {
    "use strict";
    
    if (!ko) {
        throw new Error('Argument Exception: ko is required to init the books module');
    }
    
    if (!Book) {
        throw new Error('Argument Exception: Book is required to init the books module');
    }
    
    if (!Author) {
        throw new Error('Argument Exception: Author is required to init the books module');
    }
    
    var Books,
        addAuthor,
        addAuthors;
    
    addAuthor = function (book, author) {
        if (!book) {
            throw new Error('Argument Exception: the argument, book, must be defined to add an author');
        }

        if (!author) {
            throw new Error('Argument Exception: the argument, author, must be defined to add an author');
        }

        if (!(author instanceof Author)) {
            author = new Author(author);
        }

        book.authors.push(author);
        return book;
    };
    
    addAuthors = function (book, authors) {
        if (!book) {
            throw new Error('Argument Exception: the argument, book, must be defined to add authors');
        }

        if (!authors) {
            throw new Error('Argument Exception: the argument, authors, must be defined to add authors');
        }
        
        var i = 0;
        
        for (i; i < book.authors.length; i++) {
            book = addAuthor(book, book.authors[i]);
        }
        
        return book;
    };

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
            
            if (book.authors && book.authors instanceof Array) {
                book = addAuthors(book, book.authors);
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
