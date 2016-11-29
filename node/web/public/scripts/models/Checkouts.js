Hilary.scope('heinz').register({
    name: 'Checkouts',
    singleton: true,
    dependencies: ['ko', 'Checkout', 'exceptions'],
    factory: function (ko, Checkout, exceptions) {
        'use strict';

        var Checkouts = function (checkouts) {
            var self = {};
            self.checkouts = ko.observableArray();

            self.addCheckout = function (checkout) {
                if (!checkout) {
                    exceptions.throwArgumentException('The argument, checkout, must be defined to add a checkout', 'checkout');
                    return;
                }

                self.checkouts.push(new Checkout(checkout));
            };

            // TODO: (Optimization) By adding items to the observableArray one
            // at a time, significantly more compute is required than if we
            // add them to a JS array and then set the value of self.books.
            self.addCheckouts = function (checkouts) {
                if (!checkouts) {
                    exceptions.throwArgumentException('The argument, checkouts, must be defined to add checkouts', 'checkouts');
                    return;
                }

                var i;

                for (i = 0; i < checkouts.length; i += 1) {
                    self.addCheckout(checkouts[i]);
                }
            };

            if (checkouts) {
                self.addCheckouts(checkouts);
            }

            return self;
        };

        return Checkouts;

    }
});
