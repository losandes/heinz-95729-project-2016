/**
*   Composition Root / Startup / Bootstrapper
*/
/*jslint plusplus: true*/
/*globals require, define*/
require(['routeEngine', 'views/viewEngine', 'config', 'utils',
         'controllers/homeController', 'controllers/booksController',
         'controllers/authController', 'controllers/profileController',
         'controllers/cartController', 'controllers/paymentController',
         'controllers/ordersController',
         'models/product', 'models/products', 'models/book', 'models/books',
         'models/cart', 'models/payment', 'models/user', 'models/order',
         'views/headerVw',
         'jquery', 'ko', 'lib/ko.binders', 'sammy'],
        function (routeEngineCtor, viewEngineCtor, configCtor, utilsCtor,
                   homeControllerCtor, booksControllerCtor,
                   authControllerCtor, profileControllerCtor,
                   cartControllerCtor, paymentControllerCtor,
                   ordersControllerCtor,
                   ProductCtor, ProductsCtor, BookCtor, BooksCtor,
                   CartCtor, PaymentCtor, UserCtor, OrderCtor,
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
            Payment,
            User,
            Order,
            homeController,
            booksController,
            authController,
            cartController,
            paymentController,
            ordersController,
            profileController,
            cart,
            user;
            
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
            Cart = CartCtor.init(ko, viewEngine, Product);
            Order = OrderCtor.init(ko, viewEngine, Product);
            Payment = PaymentCtor.init(ko, viewEngine, Order);            
            User = UserCtor.init(ko, viewEngine);

        }());
        //endregion MODELS
        
        //region CONTROLLERS  =================================================================
        (function () {
            cart = new Cart();
            cart.setupCart();
            user = new User();
            user.setupUser();
            booksController = booksControllerCtor.init($, routeEngine, viewEngine, Books, Book, cart);
            homeController = homeControllerCtor.init(routeEngine, viewEngine, Products, Product, cart);
            authController = authControllerCtor.init($, routeEngine, viewEngine);
            profileController = profileControllerCtor.init($, routeEngine, viewEngine);
            cartController = cartControllerCtor.init($, routeEngine, viewEngine, Cart, cart, user);
            ordersController = ordersControllerCtor.init($, routeEngine, viewEngine, Order, user);
            paymentController = paymentControllerCtor.init($, routeEngine, viewEngine, Payment, cart);
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