/*global define, JSON*/
define('controllers/paymentController', {
    init: function ($, routes, viewEngine, Payment, cart) {
        "use strict";

        //GET /#/checkout
        routes.get(/^\/#\/checkout\/?/i, function (context) {
            viewEngine.setView({
                template: 't-checkout',
                data: {
                    model: new Payment(cart),
                    cart: cart
                }
            });
        });

        //GET /#/confirmation
        routes.get(/^\/#\/confirmation\/?/i, function (context) {
            viewEngine.setView({
                template: 't-confirmation',
                data: {
                    cart: cart
                }
            });
        });

    }
});