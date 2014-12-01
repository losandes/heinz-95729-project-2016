/**
*   Composition Root / Startup / Bootstrapper
*/
/*jslint plusplus: true*/
/*globals require, define*/
require(['routeEngine', 'views/viewEngine', 'config', 'utils',
         'controllers/homeController', 'controllers/booksController',
         'controllers/authController', 'controllers/profileController',
         'controllers/checkoutController',
         'models/product', 'models/products', 'models/book', 'models/books',
         'views/headerVw',
         'jquery', 'ko', 'lib/ko.binders', 'sammy'],
        function (routeEngineCtor, viewEngineCtor, configCtor, utilsCtor,
                   homeControllerCtor, booksControllerCtor,
                   authControllerCtor, profileControllerCtor,
                   checkoutControllerCtor,
                   ProductCtor, ProductsCtor, BookCtor, BooksCtor,
                   headerVwCtor,
                   $, ko, koBinders, sammy) {
        "use strict";

        var config,
            utils,
            routeEngine,
            viewEngine,
            Product,
            Products,
            Book,
            Books,
            homeController,
            booksController,
            authController,
            profileController,
            checkoutController;
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
            Product = ProductCtor.init(ko);
            Products = ProductsCtor.init(ko, Product);
            Book = BookCtor.init(ko, Product);
            Books = BooksCtor.init(ko, Book);
        }());
        //endregion MODELS
        
        //region CONTROLLERS  =================================================================
        (function () {
            booksController = booksControllerCtor.init($, routeEngine, viewEngine, Books, Book);
            homeController = homeControllerCtor.init(routeEngine, viewEngine, Products, Product);
            authController = authControllerCtor.init($, routeEngine, viewEngine);
            profileController = profileControllerCtor.init($, routeEngine, viewEngine);
            checkoutController = checkoutControllerCtor.init($, routeEngine, viewEngine);
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
        

       // test();
    });