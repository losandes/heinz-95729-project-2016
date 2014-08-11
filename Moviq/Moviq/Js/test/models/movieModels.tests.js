/*global require, describe, it, expect, chai*/
require(['models/movieModels', 'ko'], function (movieModelsCtor, ko) {
    "use strict";
    
    var expect = chai.expect,
        should = chai.should();
    
    describe('movieModels', function () {
        
        describe('the "init" constructor, when called passing ko in as the first argument', function () {
            var mut = movieModelsCtor.init(ko);
            
            it('should return an object with a Movie property', function () {
                expect(mut).to.have.property('Movie');
            });
            
            it('should return an object with a Actor property', function () {
                expect(mut).to.have.property('Actor');
            });
            
            it('should return an object with a movieVw property', function () {
                expect(mut).to.have.property('movieVw');
            });
            
        }); // /describe
        
        describe('the "init" constructor, when called with no arguments', function () {
            var mut = function () { return movieModelsCtor.init(); };
            
            it('should throw an error', function () {
                mut.should.Throw(Error);
            });
        });
    }); // /describe
    
}); // /require
