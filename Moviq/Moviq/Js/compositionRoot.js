/**
*   Composition Root
*/
/*jslint plusplus: true*/
/*globals require, define*/
require(['routeEngine', 'views/viewEngine', 'config', 'utils', 'controllers/homeController',
         'controllers/demoController', 'controllers/booksController',
         'models/product', 'models/products', 'models/person', 'models/author', 'models/book',
         'models/books', 'models/demoGrid',
         'views/headerVw',
         'jquery', 'ko', 'lib/ko.binders', 'sammy'],
        function (routeEngineCtor, viewEngineCtor, configCtor, utilsCtor, homeControllerCtor,
                   demoControllerCtor, booksControllerCtor,
                   ProductCtor, ProductsCtor, PersonCtor, AuthorCtor, BookCtor,
                   BooksCtor, demoGridCtor,
                   headerVwCtor,
                   $, ko, koBinders, sammy) {
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
            
        // initialize ko binding extensions
        koBinders.init($, ko);
        
        //region CORE         =================================================================
        (function () {
            config = configCtor.init();
            utils = utilsCtor.init();
            viewEngine = viewEngineCtor.init($, ko);
            routeEngine = routeEngineCtor.init($, sammy, config, utils, viewEngine);

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
            booksController = booksControllerCtor.init($, routeEngine, viewEngine, Books, Book);
            demoController = demoControllerCtor.init(routeEngine, viewEngine, DemoGrid);
            homeController = homeControllerCtor.init(routeEngine, viewEngine, Products, Product);
        }());
        //endregion CONTROLLERS
            
        //region CONTROLLERS  =================================================================
        (function () {
            headerVwCtor.init($, routeEngine);
        }());
        //endregion CONTROLLERS            
            
        ko.applyBindings(viewEngine.mainVw, $('.main')[0]);
        ko.applyBindings(viewEngine.headerVw, $('header')[0]);
        routeEngine.listen();
    
    });