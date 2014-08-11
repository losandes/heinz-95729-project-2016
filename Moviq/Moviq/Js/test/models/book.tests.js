/*jshint strict: true, onevar: true*/
/*global require, describe, it, chai*/
require(['ko', 'models/product', 'models/book'], function (ko, productCtor, bookCtor) {
    "use strict";
    
    var Product = productCtor.init(ko),
        Book = bookCtor.init(ko, Product),
        expect = chai.expect;
        //should = chai.should();
    
    describe('Book', function () {
        
        describe('when constructed with the new operator', function () {
            
            it('should be in instance of Book', function () {
                var sut = new Book();
                expect(sut instanceof Book).to.equal(true);
            });
            
            it('should derived from Product (__proto__)', function () {
                var sut = new Book();
                expect(sut['__proto__'] instanceof Product).to.equal(true);
            });
            
        }); // /describe
    }); // /describe  
    
}); // /require
