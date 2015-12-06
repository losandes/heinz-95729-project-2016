Hilary.scope('heinz').register({
    name: 'exampleController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine'],
    factory: function ($this, GidgetRoute, locale, viewEngine) {
        'use strict';
    }
    	     $this.get['/cart'] = new GidgetRoute({
            routeHandler: function () {
                viewEngine.setVM({
                    template: 't-empty',
                    data: {
                        heading: locale.pages.home.empty.heading,
                        body: 'Route: "/cart"'
                    },
                    after: function (vm) {
                        console.log('view model:', vm);
                    }
                });
            },
            before: function (err, req) {
                console.log('before example 1 route:', req);
            },
            after: function (err, req) {
                console.log('after example 1 route:', req);






});