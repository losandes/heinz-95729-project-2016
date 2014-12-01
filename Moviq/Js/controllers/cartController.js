/*global define, JSON*/
define('controllers/cartController', {
    init: function ($, routes, viewEngine, Cart, cart) {
        "use strict";

        //Get /#/cart
        routes.get(/^\/#\/cart\/?/i, function (context) {
            viewEngine.setView({
                template: 't-cart',
                data: {
                    cart: cart
                }
            });
        });

        // /#/cart/add/{product_id}
        routes.get(/^\/#\/cart\/add\/(\w+)\/?/i, function (context) {
            console.log(context.params.splat[0]);

            /*
            $.ajax({
                url: '/api/books/' + context.params.splat[0]
            }).done(function (data) {
                var product = new Product(JSON.parse(data));
                var cart = new Cart("test cart");
                viewEngine.headerVw.addToCart();
                console.log(cart);
                console.log(product);
                cart.addToCart(product);
                console.log(cart.products()[0].title());
                console.log(cart.total());
            });
            */
        });

        function stripeResponseHandler(status, response) {
            alert("in handler");
            var form = $('#payment-form');
            if (response.error) {
                // Show the errors on the form
                form.find('.payment-errors').text(response.error.message);
                form.find('button').prop('disabled', false);
            } else {
                alert("success");
                var token = response.id;
                viewEngine.setView({
                    template: 't-confirmation',
                    data: {
                        cart: cart
                    }
                });
            }
        };

        function CheckoutModel() {
            var self = this;

            self.cardNum = ko.observable();
            self.cvc = ko.observable();
            self.expMonth = ko.observable();
            self.expYear = ko.observable();
            self.billingName = ko.observable();
            self.billingAddr1 = ko.observable();
            self.billingAddr2 = ko.observable();
            self.billingCity = ko.observable();
            self.billingState = ko.observable();
            self.billingZip = ko.observable();
            self.billingCountry = ko.observable();

            self.submitPay = function() {
                Stripe.card.createToken({
                    number: self.cardNum(),
                    cvc: self.cvc(),
                    exp_month: self.expMonth(),
                    exp_year: self.expYear()
                }, stripeResponseHandler);
            };

            self.editCart = function() {
                viewEngine.setView({
                    template: 't-cart',
                    data: {
                        cart: cart
                    }
                });
            };

        }

        // GET /#/checkout
        routes.get(/^\/#\/checkout\/?/i, function (context) {
            viewEngine.setView({
                template: 't-checkout',
                data: {
                    model: new CheckoutModel(),
                    cart: cart
                }
            });
        });

    }
});