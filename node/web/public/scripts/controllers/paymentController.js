Hilary.scope('heinz').register({
    name: 'paymentController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'jQuery', 'PaymentVM','Stripe', 'PaymentSuccessVM', 'PaymentFailVM'],
    factory: function ($this, GidgetRoute, locale, viewEngine, $, PaymentVM, Stripe, PaymentSuccessVM, PaymentFailVM) {
        'use strict';
        
        //Set publishable key
        Stripe.setPublishableKey('pk_test_x4WqwzcdYI6r5gVqvjXYcWPt');

        // GET /payment
        // payments
        $this.get['/payment'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/buy',
                    method: 'GET'
                }).done(function (data) {
                    $("#cartTotal").text(data.cart.books.length + " item(s)");
                    //console.log(data.cart);
                    //console.log("s");
                    viewEngine.setVM({
                        template: 't-payment',
                        data: new PaymentVM(data)
                    });
                });
            }
        });
 
        $this.get['/paysuccess'] = new GidgetRoute({
            routeHandler: function () {
                $.ajax({
                    url: '/api/cart',
                    method: 'GET'
                }).done(function (data) {
                    $("#cartTotal").text(data.cart.books.length + " item(s)");
                    console.log(data);
                    viewEngine.setVM({
                        template: 't-paysuccess',
                        data: new PaymentSuccessVM()
                    });
                });
            }
        });
 
        $this.get['/payfailed'] = new GidgetRoute({
            routeHandler: function () {
                $.ajax({
                    url: '/api/cart',
                    method: 'GET'
                }).done(function (data) {
                    $("#cartTotal").text(data.cart.books.length + " item(s)");
                    console.log(data);
                    viewEngine.setVM({
                        template: 't-payfailed',
                        data: new PaymentFailVM()
                    });
                });
            }
        });
        return $this;
    }
});
