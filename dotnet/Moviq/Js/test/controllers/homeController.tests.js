/*global require, describe, it, chai, sinon, beforeEach, afterEach*/
require(['ko', 'jquery', 'controllers/homeController', 'models/product', 'models/products'],
    function (ko, $, homeControllerCtor, productCtor, productsCtor) {
    "use strict";

    var Product = productCtor.init(ko),
        Products = productsCtor.init(ko, Product),
        routes = { // mock routeEngine
            get: function (route, func) { }
        },
        viewEngine = { // mock viewEngine
            setView: function(options) {
                currentViewOptions = options;
            }
        },
        currentViewOptions,
        sut = homeControllerCtor.init(routes, viewEngine, Products, Product),
        expect = chai.expect,
        mockData = '[{"uid":"dirk_gentlys_detective_agency","title":"Dirk Gently\'s Holistic Detective Agency","description":"There is a long tradition of Great Detectives, and Dirk Gently does not belong to it. But his search for a missing cat uncovers a ghost, a time traveler, AND the devastating secret of humankind! Detective Gently\'s bill for saving the human race from extinction: NO CHARGE.","metadata":{"authors":[{"name":"Douglas Adams"}]},"price":6.83,"thumbnailLink":"/images/books/dirkgently.jpeg","tags":null,"_type":"book"},{"uid":"hitchhikers_guide_galaxy","title":"The Hitchhiker\'s Guide to the Galaxy","description":"Seconds before the Earth is demolished to make way for a galactic freeway, Arthur Dent is plucked off the planet by his friend Ford Prefect, a researcher for the revised edition of The Hitchhiker\'s Guide to the Galaxy who, for the last fifteen years, has been posing as an out-of-work actor. Together this dynamic pair begin a journey through space aided by quotes from The Hitchhiker\'s ","metadata":{"authors":[{"name":"Douglas Adams"}]},"price":4.59,"thumbnailLink":"/images/books/hitchiker.jpeg","tags":null,"_type":"book"},{"uid":"universe_everything","title":"Life, the Universe and Everything","description":"The unhappy inhabitants of planet Krikkit are sick of looking at the night sky above their heads--so they plan to destroy it. The universe, that is. Now only five individuals stand between the white killer robots of Krikkit and their goal of total annihilation.","metadata":{"authors":[{"name":"Douglas Adams"}]},"price":5.99,"thumbnailLink":"/images/books/lifeandeverything.jpeg","tags":null,"_type":"book"},{"uid":"restaurant_at_end_universe","title":"The Restaurant at the End of the Universe","description":"Facing annihilation at the hands of the warlike Vogons is a curious time to have a craving for tea. It could only happen to the cosmically displaced Arthur Dent and his curious comrades in arms as they hurtle across space powered by pure improbability--and desperately in search of a place to eat.","metadata":{"authors":[{"name":"Douglas Adams"}]},"price":6.83,"thumbnailLink":"/images/books/restaurantuniverse.jpeg","tags":null,"_type":"book"}]';
    //should = chai.should();

    describe('HomeController', function () {

        describe('when onSearch is executed and returns results', function () {

            var stub;

            // Use Sinon to replace jQuery's ajax method with a spy.
            beforeEach(function () {
                currentViewOptions = { template: 'none' };
                stub = sinon.ajaxStub(mockData, 0);
            });

            // Restore jQuery's ajax method to its original state
            afterEach(function () {
                $.ajax.restore();
            });

            it('it should make an ajax call', function (done) {
                // when
                sut.onSearch({ params: { q: 'adams' } });

                // see if the spy was called
                expect(stub.calledOnce).to.equal(true);

                // let Mocha know we're done async testing
                done();
            });

            it('it should set the viewEngine template to the correct template', function (done) {
                // when
                var result = sut.onSearch({ params: { q: 'adams' } });

                // see if the spy was called
                result.done(function () {
                    expect(currentViewOptions.template).to.equal('t-product-grid');

                    // let Mocha know we're done async testing
                    done();
                });
            });

        });

        describe('when onSearch is executed and does NOT return results', function () {

            var stub;

            // Use Sinon to replace jQuery's ajax method with a spy.
            beforeEach(function () {
                currentViewOptions = { template: 'none' };
                stub = sinon.ajaxStub('[]', 0);
            });

            // Restore jQuery's ajax method to its original state
            afterEach(function () {
                $.ajax.restore();
            });

            it('it should make an ajax call', function (done) {
                // when
                sut.onSearch({ params: { q: 'adams' } });

                // see if the spy was called
                expect(stub.calledOnce).to.equal(true);

                // let Mocha know we're done async testing
                done();
            });

            it('it should set the viewEngine template to the correct template', function (done) {
                // when
                var result = sut.onSearch({ params: { q: 'adams' } });

                // see if the spy was called
                result.done(function () {
                    expect(currentViewOptions.template).to.equal('t-no-results');

                    // let Mocha know we're done async testing
                    done();
                });
            });

        });

    });
});