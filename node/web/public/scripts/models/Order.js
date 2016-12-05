Hilary.scope('heinz').register({
    name: 'Order',
    singleton: true,
    dependencies: ['router', 'ko', 'Blueprint', 'exceptions'],
    factory: function (router, ko, Blueprint, exceptions) {
        'use strict';

        var blueprint,
            Order;

        /*blueprint = new Blueprint({
            _id: {
                type: 'object',
                required: false
            },
            orderId: 'number',
            userId: 'string',
            date: 'string',
            total: 'money',
            books: new Blueprint({
                keywords: {
                    type: 'array',
                    required: false
                }
            })
        });*/

        Order = function (order) {
            var self = {};

            /*if (!blueprint.syncSignatureMatches(order).result) {
                exceptions.throwArgumentException('A order argument is required to create a new Order', 'order', blueprint.syncSignatureMatches(order).errors);
                return;
            }
*/
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
