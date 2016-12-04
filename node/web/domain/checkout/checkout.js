/*
// See the README.md for info on this module
*/
module.exports.name = 'Checkout';
module.exports.dependencies = ['Blueprint', 'ObjectID', 'exceptions'];
module.exports.factory = function (Blueprint, ObjectID, exceptions) {
    'use strict';

    var blueprint,
        Checkout;

    /*
    // This blueprint will be used to validate objects, and ensure that they
    // meet the minimum requirements for being a Checkout/shopping kart
    */
    blueprint = new Blueprint({
        _id: {
            type: 'object',
            required: false
        },
        userId:'string',
        books: new Blueprint({
            keywords: {
                type: 'array',
                required: false
            }
        })
    });

    /*
    // This is the Checkout constructor, which will be returned by this factory
    */
    Checkout = function (checkout) {
        // often times, we use selfies to provide a common object on which
        // to define properties. It's also common to see `var self = this`.
        var self = {};

        // Validate the the checkout argument passes muster with the Checkout blueprint
        if (!blueprint.syncSignatureMatches(checkout).result) {
            // If it doesn't, throw an argument exception
            exceptions.throwArgumentException('', 'checkout', blueprint.syncSignatureMatches(checkout).errors);
            // We don't know whether or not it will actually throw, so return undefined;
            return;
        }

        // define the Checkout properties from the Checkout argument
        self._id = new ObjectID(checkout._id);

        self.userId = checkout.userId;
        self.books = checkout.books;


        return self;
    };

    /*
    // The db object is used to create and connect to the appropriate database
    // collection, which is similar to a table in relational storage.
    */
    Checkout.db = {
        // This is the name of the collection
        collection: 'checkout',
        // The indexes improve query performance
        indexes: [
            // This index enforces a unique uid, it allows multiple nulls
            // (sparse: true), although the Checkout model requires the uid property,
            // so a null should never be present.
            {
                keys: { name: 1 },
                options: { name: 'unq.checkout.userId', unique: true, sparse: true }
            },
            // This is the full-text index, which is used for searching
            // '$**' indicates that all text properties should be included
            // in the index. We allow this to process in the background,
            // for performance reasons.
            {
                keys: { '$**': 'text' },
                options: { name: 'idx.checkout.$text', background: true }
            },
            // Because we may filter our queries by shoppingCart type, we index
            // the type property. We allow this to process in the background,
            // for performance reasons.
            {
                keys: { type: 1 },
                options: { name: 'unq.checkout.type', background: true }
            }
        ]
    };

    return Checkout;
};
