/*
// See the README.md for info on this module
*/
module.exports.name = 'OrderDetails';
module.exports.dependencies = ['Blueprint', 'ObjectID', 'exceptions'];
module.exports.factory = function (Blueprint, ObjectID, exceptions) {
    'use strict';

    var blueprint,
        OrderDetails;

    /*
    // This blueprint will be used to validate objects, and ensure that they
    // meet the minimum requirements for being a orderDetails/shopping kart
    */
    blueprint = new Blueprint({
        userId:'string',
        books: 'array'
    });

    /*
    // This is the orderDetails constructor, which will be returned by this factory
    */
    OrderDetails = function (orderDetails) {
        // often times, we use selfies to provide a common object on which
        // to define properties. It's also common to see `var self = this`.
        var self = {};

        // Validate the the orderDetails argument passes muster with the orderDetails blueprint
        if (!blueprint.syncSignatureMatches(orderDetails).result) {
            // If it doesn't, throw an argument exception
            exceptions.throwArgumentException('', 'orderDetails', blueprint.syncSignatureMatches(orderDetails).errors);
            // We don't know whether or not it will actually throw, so return undefined;
            return;
        }

        // define the orderDetails properties from the orderDetails argument
       

        self.userId = orderDetails.userId;
        self.books = orderDetails.books;


        return self;
    };

    /*
    // The db object is used to create and connect to the appropriate database
    // collection, which is similar to a table in relational storage.
    */
    OrderDetails.db = {
        // This is the name of the collection
        collection: 'orderDetails',
        // The indexes improve query performance
        indexes: [
            // This index enforces a unique uid, it allows multiple nulls
            // (sparse: true), although the orderDetails model requires the uid property,
            // so a null should never be present.
            {
                keys: { name: 1 },
                options: { name: 'unq.orderDetails.userId', unique: true, sparse: true }
            },
            // This is the full-text index, which is used for searching
            // '$**' indicates that all text properties should be included
            // in the index. We allow this to process in the background,
            // for performance reasons.
            {
                keys: { '$**': 'text' },
                options: { name: 'idx.orderDetails.$text', background: true }
            },
            // Because we may filter our queries by shoppingCart type, we index
            // the type property. We allow this to process in the background,
            // for performance reasons.
            {
                keys: { type: 1 },
                options: { name: 'unq.orderDetails.type', background: true }
            }
        ]
    };

    return OrderDetails;
};
