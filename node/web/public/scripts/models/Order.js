Hilary.scope('heinz').register({
    name: 'Order',
    singleton: true,
    dependencies: ['router', 'ko', 'Blueprint', 'exceptions'],
    factory: function (router, ko, Blueprint, exceptions) {
        'use strict';

        var blueprint,
            Order,
            OrderItem;

        blueprint = new Blueprint({
            email: 'string',
            items: {
                type: 'array',
                required: false
            }
        });

        // single order item
        var OrderItem = function(orderItem) {
            var self = this;
            self.title = ko.observable(orderItem.title);
            self.price = ko.observable(orderItem.price);
            self.quantity = ko.observable(orderItem.quantity);

            // supported operations: subtotal price of a single item
            self.subtotal = ko.pureComputed(function() {
                return self.price() * self.quantity();
            });
         
        };

        Order = function (order) {
            var self = {};

            if (!blueprint.syncSignatureMatches(order).result) {
                exceptions.throwArgumentException('An order argument is required to create a new Order', 'order', blueprint.syncSignatureMatches(order).errors);
                return;
            }

            order = order || {};

            self.email = ko.observable(order.email);
          	self.items = ko.observableArray();

            // initialize order items
            var i;
            for (i = 0; i < order.items.length; i += 1) {
                self.items.push(new OrderItem(order.items[i]));
            }

            // helper function to format output
            self.formatCurrency = function (value) {
                return "$"+value.toFixed(2);
            }

            // operation: compute total order value
            self.total = ko.pureComputed(function() {
                var total = 0;
                $.each(self.items(), function() { total += this.subtotal() });
                return total;
            });

            // operation: remove an item
            self.removeItem = function(item) { 
                self.items.remove(item); 
            };

 
            // operation: save order
            self.saveOrder = function() {
                
                // send updated order as JSON
                var dataToSave = {
                    email: self.email(),
                    items: 
                        $.map(self.items(), function(item) {
                            return {
                                title: item.title(),
                                price: item.price(),
                                quantity: item.quantity()
                            }
                        })
                };

                // alert("Could now send this to server: " + JSON.stringify(dataToSave));

                router.post("/checkout", JSON.stringify(dataToSave));

            };

            return self;
        };

        return Order;

    }
});
