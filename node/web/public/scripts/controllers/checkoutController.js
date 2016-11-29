Hilary.scope('heinz').register({
    name: 'checkoutController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine','Checkouts','Products', 'jQuery'],
    factory: function ($this, GidgetRoute, locale, viewEngine, Checkouts, Products, $) {
        'use strict';
        
        $this.get['/checkout'] = function () {
            viewEngine.setVM({
                template: 't-checkoutCopy'
            });
        };
        
        
        $this.get['/checkout/:email'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/checkout/:email' + req.uri.query.q,
                    method: 'GET'
                }).done(function (data) {
                    var results = new Checkouts(data);

                    if (results.length > 0) {
                        viewEngine.setVM({
                            template: 't-checkout',
                            data: results
                        });
                    } else {
                        viewEngine.setVM({
                            template: 't-no-results',
                            data: { searchterm: req.uri.query.q }
                        });
                    }
                });
            }
        });
        

        // GET /#/search/?q=searchterm
        // search for products


        return $this;
    }
});