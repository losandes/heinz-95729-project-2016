/*
// See the README.md for info on this module
*/
module.exports.name = 'orderDetailsRepo';
module.exports.singleton = true;
//module.exports.blueprint = ['repoBlueprint'];
module.exports.dependencies = ['db', 'OrderDetails', 'Blueprint', 'exceptions', 'is'];
module.exports.factory = function (db, OrderDetails, Blueprint, exceptions, is) {
    'use strict';

    var self = {
            get: undefined,
            find: undefined,
            create: undefined,
            update: undefined,
            remove: undefined
        },
        collection = db.collection(OrderDetails.db.collection),
        findOptionsBlueprint,
        i;

    // ensure the indexes exist
    for (i = 0; i < OrderDetails.db.indexes.length; i += 1) {
        collection.createIndex(OrderDetails.db.indexes[i].keys, OrderDetails.db.indexes[i].options);
    }

    findOptionsBlueprint = new Blueprint({
        query: 'object',
        skip: {
            type: 'number',
            required: false
        },
        limit: {
            type: 'number',
            required: false
        }
    });

    /*
    // Get a single Orderdetails
    */
    self.get = function (userId, callback) {
        // Blueprint isn't helpful for defending arguments, when they are
        // not objects. Here we defend the function arguments by hand.
        if (is.not.string(userId)) {
            exceptions.throwArgumentException('', 'userId');
            return;
        }

        if (is.not.function(callback)) {
            exceptions.throwArgumentException('', 'callback');
            return;
        }

        // This uses mongodb's find feature to obtain 1 document, by
        // limiting the result. `find` and `limit` return promises, so
        // the query isn't executed until `next` is called. It receives a
        // callback function so it can perform the IO asynchronously, and
        // free up the event-loop, while it's waiting.
        //collection.find({$and: [ {'books.status': 'add'}, { userId: userId }]}).limit(1).next(function (err, doc) {
        collection.find({ userId : userId }).limit(1).next(function (err, doc) {    
            if (err) {
                callback(err);
                return;
            }

    			if(doc) {
    				callback(null, new OrderDetails(doc));
          } else {
             callback(null,null);
          }
    			

        });
    };

    return self;
};
