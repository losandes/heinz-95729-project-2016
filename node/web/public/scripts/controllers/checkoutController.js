Hilary.scope('heinz').register({
    name: 'checkoutController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'Orders', 'Payment', 'jQuery'],
    factory: function ($this, GidgetRoute, locale, viewEngine, Orders, Payment, $) {
        'use strict';

        // temporary put it here, hard code the page to a search result
        // GET /checkout
        $this.get['/checkout'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    // consider add email, now hard code on server side first
                    url: '/api/checkout',
                    method: 'GET'
                }).done(function (data) {
                    var results = new Orders(data);

                    if (results.orders().length > 0) {
                        viewEngine.setVM({
                            template: 't-checkout',
                            data: results
                        });
                    } else {
                        viewEngine.setVM({
                            template: 't-no-results',
                            data: { searchterm: "no orders?!" }
                        });
                    }
                });
            }
        });

        // POST /checkout
        $this.post['/checkout'] = new GidgetRoute({
            routeHandler: function (err, req) {
                console.log(req.payload);
                $.ajax({
                    // consider add email, now hard code on server side first
                    url: '/api/checkout',
                    method: 'POST',
                    data: req.payload,
                    contentType: 'application/json',
                }).done(function (data) {

                    // prompt user the result
                    if(data == "Success") {
                        alert("Save order succeeded!");
                    } else {
                        alert("Save order failed!");
                    }
                //     // var value = JSON.parse(result);
                //     var results = new Orders(data);

                //     if (results.orders().length > 0) {
                //         viewEngine.setVM({
                //             template: 't-checkout',
                //             data: results
                //         });
                //     } else {
                //         viewEngine.setVM({
                //             template: 't-no-results',
                //             data: { searchterm: "no no no?!" }
                //         });
                //     }
                });
            }
        });

        // temporary put it here, hard code the page to a search result
        // GET /checkout
        $this.get['/orderhistory'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    // consider add email, now hard code on server side first
                    url: '/api/checkout',
                    method: 'GET'
                }).done(function (data) {
                    var results = new Orders(data);

                    if (results.orders().length > 0) {
                        viewEngine.setVM({
                            template: 't-order-history',
                            data: results
                        });
                    } else {
                        viewEngine.setVM({
                            template: 't-no-results',
                            data: { searchterm: "no orders?!" }
                        });
                    }
                });
            }
        });


        // temporary put it here
        // GET /payment
        $this.get['/payment'] = new GidgetRoute({
            routeHandler: function () {
                viewEngine.setVM({
                    template: 't-payment',
                    data: new Payment()
                });
            }
        });

        // temporary put it here
        // POST /checkout
        $this.post['/payment'] = new GidgetRoute({
            routeHandler: function (err, req) {
                console.log(req.payload);
                $.ajax({
                    // consider add email, now hard code on server side first
                    url: '/payment',
                    method: 'POST',
                    data: req.payload,
                    contentType: 'application/json'
                }).done(function (data) {

                    // prompt user the result
                    if(data == 500) {
                        console.log("Save order failed!");
                    } else if(data == 204) {
                        console.log("Save order succeeded!");
                    }
                });
            }
        });

        return $this;
    }
});
