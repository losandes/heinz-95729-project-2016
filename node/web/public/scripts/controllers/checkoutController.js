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
                $.ajax({
                    url: '/api/count',
                    method: 'GET'
                }).done(function (data) {
                  var cart = document.getElementById("cart");
                  cart.style.color = "#fff";
                  cart.style.background= "#ff0000";
                  cart.style.fontSize= "12px";
                  cart.style.padding = "0 5px";
                  cart.style.position = "absolute";
                  cart.style.marginLeft="-2px";
                  cart.style.verticalAlign = top;
                  cart.style.borderRadius = "50px 15px";
                  cart.innerHTML = "";
                  cart.appendChild(document.createTextNode(data));
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

        // POST /saveOrder
        $this.post['/saveOrder'] = new GidgetRoute({
            routeHandler: function (err, req) {
                console.log(req.payload);
                var totalValue = req.payload.totalValue;
                $.ajax({
                    // consider add email, now hard code on server side first
                    url: '/api/saveOrder',
                    method: 'POST',
                    data: JSON.stringify(req.payload),
                    contentType: 'application/json',
                }).done(function (data) {

                    // prompt user the result
                    if(data == "Success") {
                      $.ajax({
                          url: '/api/count',
                          method: 'GET'
                      }).done(function (data) {
                        var cart = document.getElementById("cart");
                        cart.style.color = "#fff";
                        cart.style.background= "#ff0000";
                        cart.style.fontSize= "12px";
                        cart.style.padding = "0 5px";
                        cart.style.position = "absolute";
                        cart.style.marginLeft="-2px";
                        cart.style.verticalAlign = top;
                        cart.style.borderRadius = "50px 15px";
                        cart.innerHTML = "";
                        cart.appendChild(document.createTextNode(data));
                          alert("Save order succeeded!");
                      });


                    } else {
                        alert("Save order failed!");
                    }
                });
            }
        });

        // POST /submitOrder
        $this.post['/submitOrder'] = new GidgetRoute({
            routeHandler: function (err, req) {

                var totalValue = req.payload.totalValue;
                console.log(typeof totalValue);

                    // prompt user the result

                        alert("Submit order succeeded. Redirect to payment page.");

                        // Shall I send the order again after the payment is successful?

                        // render the payment page
                        viewEngine.setVM({
                            template: 't-payment',
                            // show amount to pay
                            data: new Payment(totalValue)
                        });

                }
            });


        // temporary put it here
        // GET /payment
        // $this.get['/payment'] = new GidgetRoute({
        //     routeHandler: function () {
        //         viewEngine.setVM({
        //             template: 't-payment',
        //             data: new Payment()
        //         });
        //     }
        // });

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
                    if(data == "500") {
                        alert("Payment failed! Please retry!");
                    } else if(data == "204") {
                        console.log("Payment succeeded!");
                        // should redirect user to payment successful page
                        $.ajax({
                            url: '/api/paymentSuccessful',
                            method: 'POST'
                        }).done(function (data){
                          $.ajax({
                              url: '/api/count',
                              method: 'GET'
                          }).done(function (data) {
                            var cart = document.getElementById("cart");
                            cart.style.color = "#fff";
                            cart.style.background= "#ff0000";
                            cart.style.fontSize= "12px";
                            cart.style.padding = "0 5px";
                            cart.style.position = "absolute";
                            cart.style.marginLeft="-2px";
                            cart.style.verticalAlign = top;
                            cart.style.borderRadius = "50px 15px";
                            cart.innerHTML = "";
                            cart.appendChild(document.createTextNode(data));
                            viewEngine.setVM({
                                template: 't-paymentSuccess',
                                // Consider putting user information in the data
                                data: {}
                              });
                          });

                });
            }
        });
      }
    });
        return $this;
    }
});
