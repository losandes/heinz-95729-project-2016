Hilary.scope('heinz').register({
    name: 'Orders',
    singleton: true,
    dependencies: ['ko', 'Order', 'exceptions'],
    factory: function (ko, Order, exceptions) {
        'use strict';

        var Orders = function (orders) {
            var self = {};
            self.orders = ko.observableArray();

            self.addOrder = function (order) {
                if (!order) {
                    exceptions.throwArgumentException('The argument, Order, must be defined to add a order', 'order');
                    return;
                }

                self.orders.push(new Order(order));
            };

            // TODO: (Optimization) By adding items to the observableArray one
            // at a time, significantly more compute is required than if we
            // add them to a JS array and then set the value of self.books.
            self.addOrders = function (orders) {
                if (!orders) {
                    exceptions.throwArgumentException('The argument, orders, must be defined to add orders', 'orders');
                    return;
                }

                var i;

                for (i = 0; i < orders.length; i += 1) {
                    self.addOrder(orders[i]);
                }
            };

            if (orders) {
                self.addOrders(orders);
            }

            return self;
        };
        console.log("orders:");
        console.log(Orders);
        return Orders;

    }
});
