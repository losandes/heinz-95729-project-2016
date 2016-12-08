Hilary.scope('heinz').register({
    name: 'OrderDetails',
    singleton: true,
    dependencies: ['router', 'ko', 'Blueprint', 'exceptions'],
    factory: function (router, ko, Blueprint, exceptions) {
        'use strict';

        var blueprint,
            OrderDetails;

        blueprint = new Blueprint({
            userId:'string',
            books: 'array'
        });

        OrderDetails = function (orderDetails) {
            var self = {};

            if (!blueprint.syncSignatureMatches(orderDetails).result) {
                exceptions.throwArgumentException('A orderDetails argument is required to create a new Product', 'orderDetails', blueprint.syncSignatureMatches(orderDetails).errors);
                return;
            }

            orderDetails = orderDetails || {};

            var type = orderDetails.type || 'orderDetails';

            self.userId = ko.observable(orderDetails.userId);
            self.shoppingCartId= ko.observable(orderDetails.shoppingCartId|| undefined);
            self.books = ko.observable(orderDetails.books || undefined);
           

            return self;
        };

        return OrderDetails;

    }
});
