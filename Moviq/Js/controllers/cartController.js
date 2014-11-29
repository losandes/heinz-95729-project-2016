/*global define, JSON*/
define('controllers/cartController', {
    init: function ($, ko, routes, viewEngine, Cart, cart) {
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

        function CheckoutModel() {
            var self = this;

            self.cardNum = ko.observable();
            self.cvc = ko.observable();
            self.expMonth = ko.observable();
            self.expYear = ko.observable();
        }

        var check = new CheckoutModel();

        // GET /#/checkout
        routes.get(/^\/#\/checkout\/?/i, function (context) {
            viewEngine.setView({
                template: 't-checkout',
                data: {
                    model: check
                }
            });
        });

    }
});