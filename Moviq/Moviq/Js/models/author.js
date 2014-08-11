/*global define*/
define('models/author', { init: function (ko, Person) {
    "use strict";
    
    if (!ko) {
        throw new Error('Argument Exception: ko is required to init the author module');
    }
    
    if (typeof Person !== 'function') {
        throw new Error('Argument Exception: Person is required to init the author module');
    }
    
    var Author;
        
    Author = function (author) {
        var $this = this;
        author = author || {};
        
        $this.setPersonData($this, author);
        
        $this.thumbnailLink = ko.observable(author.thumbnailLink || '/images/authors/default.png');
        $this.books = ko.observableArray();
    };
    
    Author.prototype = new Person();
    
    return Author;
}});
