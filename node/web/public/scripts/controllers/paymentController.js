Hilary.scope('heinz').register({
    name: 'paymentController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'jQuery', 'PaymentVM','Stripe'],
    factory: function ($this, GidgetRoute, locale, viewEngine, $, PaymentVM, Stripe) {
        'use strict';
        
        //Set publishable key
        Stripe.setPublishableKey('pk_test_x4WqwzcdYI6r5gVqvjXYcWPt');

        // GET /payment
        // payments
        $this.get['/payment'] = new GidgetRoute({
           routeHandler: function (err, req) {
                 viewEngine.setVM({
                        template: 't-payment',
                        data: new PaymentVM(400)
                    });
               
            }
        });

        return $this;
    }
});
