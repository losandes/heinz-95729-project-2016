Hilary.scope('heinz').register({
    name: 'addToCartController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine','Checkout', 'Checkouts','Products', 'jQuery'],
    factory: function ($this, GidgetRoute, locale, viewEngine, Checkout, Checkouts, Products, $) {
        'use strict';


        $this.post['/addtoCart'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/addtoCart/'
                }).done(function (data) {
                    var checkout = new Checkout(data);
                    console.log(checkout);
                    viewEngine.setVM({
                        template: 't-checkout',
                        data: { checkout: checkout }
                    });

        //             recalculateCart();


                });
            }
        });



        return $this;
    }
});
