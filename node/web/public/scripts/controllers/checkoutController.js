Hilary.scope('heinz').register({
    name: 'checkoutController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine','Checkout','Products', 'jQuery'],
    factory: function ($this, GidgetRoute, locale, viewEngine, Checkout, Products, $) {
        'use strict';
        
        $this.get['/checkout'] = function () {
            viewEngine.setVM({
                template: 't-checkoutCopy'
            });
        };
        
        /*
        $this.get['/checkout/:email'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/checkout/' + req.params.uid
                }).done(function (data) {
                    var checkout = new Checkout(data);

                    viewEngine.setVM({
                        template: 't-checkout',
                        data: { checkout: checkout }
                    });
                });
            }
        });*/
        

        // GET /#/search/?q=searchterm
        // search for products
        $this.get['/search'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/search?q=' + req.uri.query.q,
                    method: 'GET'
                }).done(function (data) {
                    var results = new Products(data);

                    if (results.products().length > 0) {
                        viewEngine.setVM({
                            template: 't-product-grid',
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

        return $this;
    }
});