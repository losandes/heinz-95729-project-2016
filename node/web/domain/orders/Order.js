module.exports.name = 'Order';
module.exports.dependencies = ['Blueprint', 'ObjectID', 'exceptions'];
module.exports.factory = function (Blueprint, ObjectID, exceptions) {
    'use strict';

    var blueprint,
		Order;

    /*
    // This blueprint will be used to validate objects, and ensure that they
    // meet the minimum requirements for being a Product
    */
    blueprint = new Blueprint({
        _id: {
            type: 'object',
            required: false
        },
        email: 'string',
        items: {
            type: 'array',
            required: false
        },
        // isCompleted : 'boolean'
        
    });

    /*
    // This is the Product constructor, which will be returned by this factory
    */
    Order = function (order) {
        // often times, we use selfies to provide a common object on which
        // to define properties. It's also common to see `var self = this`.
        var self = {};

        // Validate the the product argument passes muster with the Product blueprint
        if (!blueprint.syncSignatureMatches(order).result) {
            // If it doesn't, throw an argument exception
            exceptions.throwArgumentException('', 'order', blueprint.syncSignatureMatches(order).errors);
            // We don't know whether or not it will actually throw, so return undefined;
            return;
        }

        // define the Product properties from the product argument
        self._id = new ObjectID(order._id);
        self.email = order.email;
        self.items = order.items;
        // self.isCompleted = order.isCompleted;

        return self;
    };

    /*
    // The db object is used to create and connect to the appropriate database
    // collection, which is similar to a table in relational storage.
    */
    Order.db = {
        // This is the name of the collection
        collection: 'orders',
        // The indexes improve query performance
        indexes: [
        	{
                keys: { email: 1 },
                options: { name: 'idx.orders.email', unique: false }
            }
        ]
    };

    return Order;
};
