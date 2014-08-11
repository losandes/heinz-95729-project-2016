/*global require, describe, it, chai*/
require(['ko', 'models/product', 'models/book'], function (ko, productCtor, bookCtor) {
    "use strict";
    
    var Product = productCtor.init(ko),
        Book = bookCtor.init(ko, Product),
        expect = chai.expect;
        //should = chai.should();
    
    describe('Book', function () {
        
        describe('when constructed with the new operator', function () {
            var sut = new Book();
            
            it('should be in instance of Book', function () {
                expect(sut instanceof Book).to.equal(true);
            });
            
            it('should derived from Product (__proto__)', function () {
                expect(sut['__proto__'] instanceof Product).to.equal(true);
            });
            
            it('should have an id property', function () {
                expect(sut).to.have.property('id');
                expect(typeof sut.id()).to.equal('number');
            });
            
            it('should have an title property', function () { expect(sut).to.have.property('title'); });
            it('should have an description property', function () { expect(sut).to.have.property('description'); });
            it('should have an metadata property', function () { expect(sut).to.have.property('metadata'); });
            it('should have an price property', function () { expect(sut).to.have.property('price'); });
            it('should have an images property', function () { expect(sut).to.have.property('images'); });
            it('should have an thumbnailLink property', function () { expect(sut).to.have.property('thumbnailLink'); });
            it('should have an thumbnailAlt property', function () { expect(sut).to.have.property('thumbnailAlt'); });
            it('should have an authors property', function () { expect(sut).to.have.property('authors'); });
            it('should have an reviews property', function () { expect(sut).to.have.property('reviews'); });
            it('should have an setProductData property', function () { expect(sut).to.have.property('setProductData'); });
            
            it('should have an setProductData property in it\'s prototype', function () {
                expect(sut['__proto__']).to.have.property('setProductData');
            });
            
            it('should NOT have book properties in it\'s prototype', function () {
                expect(sut['__proto__']).not.to.have.property('id');
                expect(sut['__proto__']).not.to.have.property('title');
                expect(sut['__proto__']).not.to.have.property('description');
                expect(sut['__proto__']).not.to.have.property('metadata');
                expect(sut['__proto__']).not.to.have.property('price');
                expect(sut['__proto__']).not.to.have.property('thumbnailLink');
                expect(sut['__proto__']).not.to.have.property('thumbnailAlt');
                expect(sut['__proto__']).not.to.have.property('authors');
                expect(sut['__proto__']).not.to.have.property('reviews');
            });
        }); // /describe 'when constructed with the new operator'
        
        describe('when multiple Book objects exist and the values of one change', function () {
            var sut1 = new Book({ id: 1, title: 'hello world!' }),
                sut2 = new Book({ id: 2, title: 'foo bar' });
            
            it('should not affect the values of other Books', function () {
                sut2.title('new world!');
                expect(sut1.title()).to.equal('hello world!');
                expect(sut2.title()).to.equal('new world!');
            });
            
            it('should share the same prototype values with all Books', function () {
                sut1['__proto__'].foo = 'bar';
                expect(sut2.foo).to.equal('bar');
            });
        }); // /describe 'when multiple Book objects exist and the values of one change'
        
        describe('the "init" constructor, when called with missing arguments', function () {
            var mut1 = function () { return bookCtor.init(undefined, Product); },
                mut2 = function () { return bookCtor.init(ko); },
                mut3 = function () { return bookCtor.init(ko, 'foo'); };
            
            it('should throw an error when the ko argument is undefined', function () {
                expect(mut1).to.throw('Argument Exception: ko is required to init the book module');
            });
            
            it('should throw an error when the Product argument is undefined', function () {
                expect(mut2).to.throw('Argument Exception: Product is required to init the book module');
            });
            
            it('should throw an error when the Product argument is not a function', function () {
                expect(mut2).to.throw('Argument Exception: Product is required to init the book module');
            });
            
        }); // /describe 'the "init" constructor, when called with missing arguments'
        
    }); // /describe 'Book'
    
}); // /require
