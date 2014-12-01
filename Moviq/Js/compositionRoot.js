/**
*   Composition Root / Startup / Bootstrapper
*/
/*jslint plusplus: true*/
/*globals require, define*/
require(['routeEngine', 'views/viewEngine', 'config', 'utils',
         'controllers/homeController', 'controllers/booksController',
         'controllers/authController', 'controllers/profileController',
         'controllers/checkoutController',
         'models/product', 'models/products', 'models/book', 'models/books', 'models/cart', 'models/cartItem',
         'views/headerVw',
         'jquery', 'ko', 'lib/ko.binders', 'sammy'],
        function (routeEngineCtor, viewEngineCtor, configCtor, utilsCtor,
                   homeControllerCtor, booksControllerCtor,
                   authControllerCtor, profileControllerCtor,
                   checkoutControllerCtor,
                   ProductCtor, ProductsCtor, BookCtor, BooksCtor,CartCtor,CartItemCtor,
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
            Cart,
            CartItem,
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
            CartItem = CartItemCtor.init(ko, Product);
            Cart = CartCtor.init(ko, CartItem);

        }());
        //endregion MODELS
        
        //region CONTROLLERS  =================================================================
        (function () {
            booksController = booksControllerCtor.init($, routeEngine, viewEngine, Books, Book, Cart);
            homeController = homeControllerCtor.init(routeEngine, viewEngine, Products, Product,Cart);
            authController = authControllerCtor.init($, routeEngine, viewEngine, Cart);
            profileController = profileControllerCtor.init($, routeEngine, viewEngine, Cart);
            checkoutController = checkoutControllerCtor.init($, routeEngine, viewEngine,Cart);
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