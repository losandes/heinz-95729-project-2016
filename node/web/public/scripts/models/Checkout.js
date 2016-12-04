Hilary.scope('heinz').register({
    name: 'Checkout',
    singleton: true,
    dependencies: ['router', 'ko', 'Blueprint', 'exceptions'],
    factory: function (router, ko, Blueprint, exceptions) {
        'use strict';

        var blueprint,
            Checkout;

        blueprint = new Blueprint({
            userId:'string',
            shoppingCartId: 'number',
            books: new Blueprint({
                keywords: {
                    type: 'array',
                    required: false
                }
            })
        });

        Checkout = function (checkout) {
            var self = {};

            if (!blueprint.syncSignatureMatches(checkout).result) {
                exceptions.throwArgumentException('A checkout argument is required to create a new Product', 'checkout', blueprint.syncSignatureMatches(checkout).errors);
                return;
            }

            checkout = checkout || {};

            var type = checkout.type || 'checkout';

            self.userId = ko.observable(checkout.userId);
            self.shoppingCartId= ko.observable(checkout.shoppingCartId|| undefined);
            self.books = ko.observable(checkout.books || undefined);
           

            return self;
        };

        return Checkout;

    }
});
