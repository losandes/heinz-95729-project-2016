/*global require, describe, it, chai*/
require(['ko', 'models/person', 'models/author'], function (ko, personCtor, authorCtor) {
    "use strict";
    
    var Person = personCtor.init(ko),
        //Author = authorCtor.init(ko, Person),
        expect = chai.expect;
    
    describe('Author', function () {

        describe('the "init" constructor, when called with missing arguments', function () {
            var mut1 = function () { return authorCtor.init(undefined, Person); },
                mut2 = function () { return authorCtor.init(ko); },
                mut3 = function () { return authorCtor.init(ko, 'foo'); };
            
            it('should throw an error when the ko argument is undefined', function () {
                expect(mut1).to.throw('Argument Exception: ko is required to init the author module');
            });
            
            it('should throw an error when the Person argument is undefined', function () {
                expect(mut2).to.throw('Argument Exception: Person is required to init the author module');
            });
            
            it('should throw an error when the Person argument is not a function', function () {
                expect(mut2).to.throw('Argument Exception: Person is required to init the author module');
            });
            
        }); // /describe 'the "init" constructor, when called with missing arguments'
        
    }); // /describe 'Author'
    
}); // /require
