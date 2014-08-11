/**
*   Composition Root
*/
/*jslint plusplus: true*/
/*globals require, define*/
require(['routeEngine', 'views/viewEngine', 'config', 'utils', 'controllers/homeController',
         'models/demoGrid', 'controllers/demoController', 'jquery', 'ko', 'sammy'],
        function (routeEngineCtor, viewEngineCtor, configCtor, utilsCtor, homeControllerCtor,
                   demoGridCtor, demoControllerCtor, $, ko, sammy) {
        "use strict";

        var config,
            utils,
            routeEngine,
            viewEngine,
            DemoGrid,
            //movieModels,
            //movies,
            homeController,
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
            DemoGrid = demoGridCtor.init(ko);
        }());
        //endregion MODELS
        
        //region CONTROLLERS  =================================================================
        (function () {
            demoController = demoControllerCtor.init(routeEngine, viewEngine, DemoGrid);
            homeController = homeControllerCtor.init(routeEngine, viewEngine);
        }());
        //endregion CONTROLLERS
            
        ko.applyBindings(viewEngine.mainVw, $('#main')[0]);
        routeEngine.listen();
    
    });