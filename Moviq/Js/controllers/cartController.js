/*global define, JSON*/
define('controllers/cartController', {
    init: function ($, routes, viewEngine, Cart) {
        "use strict";

        // GET /#/cart
        // cart
        routes.get(/^\/#\/cart\/?/i, function (context) {  
            $.ajax({
                url: '/api/cart',
                method: 'GET'
            }).done(function (data) {
                var testStr = JSON.parse(data);
                var cart = new Cart(testStr);
                console.log(cart);
                    viewEngine.setView({
                        template: 't-cart',
                        data: {
                            cart: cart,
                            test: testStr
                        }
                    });
                 
            });
        });


    }
});
