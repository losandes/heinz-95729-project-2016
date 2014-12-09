/*global define, JSON*/
define('controllers/ordersController', {
    init: function ($, routes, viewEngine, Order, user) {
        "use strict";

        // GET /#/order-history
        routes.get(/^\/#\/orders\/?/i, function (context) {
            var callbackSetView = function () {
                viewEngine.setView({
                    template: 't-orders',
                    data: {
                        user: user,
                        orderHistory: user.orderHistory
                    }
                });
            }
            if (user.orderHistory.length == 0) {
                user.getOrders(callbackSetView);
            } else {
                callbackSetView();
            } 
            
        });

        /*
        routes.get(/^\/#\/orders\/(\w+)\/?/i, function (context) {
            $.ajax({
                url: '/api/order/get' + context.params.splat[0]
            }).done(function (data) {
                var order = new Order(JSON.parse(data));

                viewEngine.setView({
                    template: 't-order-details',
                    data: {
                        order: order
                    }
                });

            });
        });
        */
    }
});
