/**
*   Composition Root
*/
/*jslint plusplus: true*/
/*globals require, define*/
require(['routeEngine', 'views/viewEngine', 'config', 'utils', 'controllers/homeController',
         'controllers/demoController', 'controllers/booksController',
         'models/product', 'models/products', 'models/person', 'models/author', 'models/book', 'models/books',
         'models/demoGrid', 'jquery', 'ko', 'sammy'],
        function (routeEngineCtor, viewEngineCtor, configCtor, utilsCtor, homeControllerCtor,
                   demoControllerCtor, booksControllerCtor,
                   ProductCtor, ProductsCtor, PersonCtor, AuthorCtor, BookCtor, BooksCtor,
                   demoGridCtor, $, ko, sammy) {
        "use strict";

        var config,
            utils,
            routeEngine,
            viewEngine,
            Product,
            Products,
            Person,
            Author,
            Book,
            Books,
            DemoGrid,
            //movieModels,
            //movies,
            homeController,
            booksController,
            demoController;
        
        //region CORE         =================================================================
        (function () {
            config = configCtor.init();
            utils = utilsCtor.init();
            routeEngine = routeEngineCtor.init($, sammy, config, utils);
            viewEngine = viewEngineCtor.init(ko);

            define('routes', function () { return routeEngine; });
            define('views', function () { return viewEngine; });
        }());
        //endregion CORE

        //region MODELS       =================================================================
        (function () {
            //        movieModels = movieModelsCtor.init(ko);
            //        movies = moviesCtor.init(ko, movieModels);
            Product = ProductCtor.init(ko);
            Products = ProductsCtor.init(ko, Product);
            Person = PersonCtor.init(ko);
            Author = AuthorCtor.init(ko, Person);
            Book = BookCtor.init(ko, Product);
            Books = BooksCtor.init(ko, Book, Author);
            
            DemoGrid = demoGridCtor.init(ko, Product);
        }());
        //endregion MODELS
        
        //region CONTROLLERS  =================================================================
        (function () {
            booksController = booksControllerCtor.init($, routeEngine, viewEngine, Books);
            demoController = demoControllerCtor.init(routeEngine, viewEngine, DemoGrid);
            homeController = homeControllerCtor.init(routeEngine, viewEngine);
        }());
        //endregion CONTROLLERS
            
        ko.applyBindings(viewEngine.mainVw, $('#main')[0]);
        routeEngine.listen();
    
    });