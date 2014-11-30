/*global define, JSON*/
define('controllers/cartController', {
    init: function ($, routes, viewEngine, Cart, cart) {
        "use strict";

        //Get /#/checkout
        routes.get(/^\/#\/checkout\/?/i, function (context) {
            viewEngine.setView({
                template: 't-checkout',
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


        // GET /#/cart
        // cart
        routes.get(/^\/#\/cart\/?/i, function (context) {  
            viewEngine.setView({
                template: 't-cart',
                data: {
                    cart: cart
                }
            });
            /*
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
            */
        });



    }
});
