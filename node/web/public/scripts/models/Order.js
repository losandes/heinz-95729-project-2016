Hilary.scope('heinz').register({
    name: 'Order',
    singleton: true,
    dependencies: ['router', 'ko', 'Blueprint', 'exceptions'],
    factory: function (router, ko, Blueprint, exceptions) {
        'use strict';

        var blueprint,
            Order;

        Order = function (order) {
            var self = {};

            order = order || {};

            var type = order.type || 'order';

           // self._id = new ObjectID(order._id);
            self.date = order.date;
            self.userId = order.userId;
            self.orderId = order.orderId;
            self.total = order.total;
            self.books = order.books;
               

            return self;
        };

        return Order;

    }
});
