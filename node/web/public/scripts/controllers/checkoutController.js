Hilary.scope('heinz').register({
    name: 'checkoutController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine','Checkout', 'Checkouts','Products', 'jQuery'],
    factory: function ($this, GidgetRoute, locale, viewEngine, Checkout, Checkouts, Products, $) {
        'use strict';
        
        $this.get['/checkout'] = function () {
            viewEngine.setVM({
                template: 't-checkoutCopy'
            });
        };
        
        
        $this.get['/checkout/:email'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/checkout/' + req.params.email
                }).done(function (data) {
                    var checkout = new Checkout(data);
                    console.log(checkout);
                    viewEngine.setVM({
                        template: 't-checkout',
                        data: { checkout: checkout }
                    });
                    recalculateCart();
                    

                });
            }
        });
        


        // GET /#/search/?q=searchterm
        // search for products


        return $this;
    }
});

