/*global require, describe, it, expect, chai*/
require(['utils'], function (utilsCtor) {
    "use strict";
    
    var utils = utilsCtor.init(),
        expect = chai.expect,
        sut = utils.getRandomString();
    
    describe('utils', function () {
        
        describe('getRandomString, when executed without any arguments', function () {
            
            it('should return a 5 character string', function () {
                expect(sut).to.have.length(5);
            });
            
            it('should return a String', function () {
                expect(sut).to.be.a('string');
            });
            
        }); // /describe
    }); // /describe
    
}); // /require
