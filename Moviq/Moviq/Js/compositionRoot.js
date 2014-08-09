/**
*   Composition Root
*/
/*jslint plusplus: true*/
/*globals require*/
require(['movies', 'movieModels', 'codropsGrid', 'jquery', 'ko'],
        function (moviesCtor, movieModelsCtor, codrops, $, ko) {
        "use strict";

        var movieModels, movies;

        movieModels = movieModelsCtor.init(ko);
        movies = moviesCtor.init(ko, movieModels);
        
        codrops.init(ko);
            
        ko.applyBindings(null, $('#main')[0]);
    
    });