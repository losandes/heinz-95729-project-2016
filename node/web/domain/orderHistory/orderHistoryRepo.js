/*
// See the README.md for info on this module
*/
module.exports.name = 'orderHistoryRepo';
module.exports.singleton = true;
//module.exports.blueprint = ['repoBlueprint'];
module.exports.dependencies = ['db', 'Order','Blueprint', 'exceptions', 'is'];
module.exports.factory = function (db, Order, Blueprint, exceptions, is) {
    'use strict';

    var self = {
            get: undefined,
            find: undefined,
            create: undefined,
            update: undefined,
            remove: undefined
        },
        collection = db.collection(Order.db.collection),
        findOptionsBlueprint,
        i;

    // ensure the indexes exist
    for (i = 0; i < Order.db.indexes.length; i += 1) {
        collection.createIndex(Order.db.indexes[i].keys, Order.db.indexes[i].options);
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
    // Get a single order
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
        
        collection.find({userId: userId}).toArray(function (err, docs) {
            var orders = [], i;

            if (err) {
                callback(err);
                return;
            }
            console.log(docs.length);
            for (i = 0; i < docs.length; i += 1) {
                orders.push(new Order(docs[i]));
            }

            callback(null, orders);
        });
    };

	self.create = function (payload, callback) {
		if (is.not.object(payload)) {
			exceptions.throwArgumentException('', 'payload');
			return;
		}

		if (is.not.function(callback)) {
			exceptions.throwArgumentException('', 'callback');
			return;
		}

		collection.insertOne(payload, callback);
	};


	return self;
};
