module.exports.name = 'ordersRepo';
module.exports.singleton = true;
//module.exports.blueprint = ['repoBlueprint'];
module.exports.dependencies = ['db', 'Order', 'Blueprint', 'exceptions', 'is'];
module.exports.factory = function (db, Order, Blueprint, exceptions, is) {
    'use strict';

    var self = {
            get: undefined,
            find: undefined,
            create: undefined,
            update: undefined,
            remove: undefined,
            updateCart: undefined,
            getCount: undefined
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
    self.get = function (email, callback) {
        if (is.not.string(email)) {
            exceptions.throwArgumentException('', 'email');
            return;
        }

        if (is.not.function(callback)) {
            exceptions.throwArgumentException('', 'callback');
            return;
        }

        collection.find({ email: email }).limit(1).next(function (err, order) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, new Order(order));
        });
    };

    /*
    // Find order(s)
    */
    self.find = function (options, callback) {
        // Since options is an object, we can use Blueprint to validate it.
        if (!findOptionsBlueprint.syncSignatureMatches(options).result) {
            exceptions.throwArgumentException('', 'options', findOptionsBlueprint.syncSignatureMatches(options).errors);
            return;
        }

        // But we'll make sure a callback function was provided, by hand
        if (is.not.function(callback)) {
            exceptions.throwArgumentException('', 'callback');
            return;
        }

        // Set default skip and limit values if they weren't set
        var skip = options.skip || 0,
            limit = options.limit || 20;

        // This uses mongodb's find feature to obtain multiple documents,
        // although it still limits the result set. `find`, `skip`, and `limit`
        // return promises, so the query isn't executed until `toArray` is
        // called. It receives a callback function so it can perform the
        // IO asynchronously, and free up the event-loop, while it's waiting.
        collection.find(options.query).skip(skip).limit(limit).toArray(function (err, docs) {
            var orders = [], i;

            if (err) {
                callback(err);
                return;
            }

            for (i = 0; i < docs.length; i += 1) {
                orders.push(new Order(docs[i]));
            }

            callback(null, orders);
        });
    };
    self.remove = function (email, callback) {
        // Since options is an object, we can use Blueprint to validate it.

        if (is.not.object({"email":email})) {
            exceptions.throwArgumentException('', 'email');
            return;
        }
        // But we'll make sure a callback function was provided, by hand
        if (is.not.function(callback)) {
            exceptions.throwArgumentException('', 'callback');
            return;
        }


        // This uses mongodb's find feature to obtain multiple documents,
        // although it still limits the result set. `find`, `skip`, and `limit`
        // return promises, so the query isn't executed until `toArray` is
        // called. It receives a callback function so it can perform the
        // IO asynchronously, and free up the event-loop, while it's waiting.
        collection.deleteOne({"email": email}, callback);
    };

    /*
    // Update an order
    */
    self.update = function (email, payload, callback) {

        console.log("orders db update get called!");

        if (is.not.object({"email":email})) {
            exceptions.throwArgumentException('', 'email');
            return;
        }

        if (is.not.object(payload)) {
            exceptions.throwArgumentException('', 'payload');
            return;
        }

        if (is.not.function(callback)) {
            exceptions.throwArgumentException('', 'callback');
            return;
        }

        // actually replace an order
        collection.replaceOne({"email": email}, payload, callback);
    };

    self.updateCart = function (email, payload, callback) {

        console.log("orders db updateCart get called!");
        if (is.not.object({"email":email})) {
            exceptions.throwArgumentException('', 'email');
            return;
        }

        if (is.not.object(payload)) {
            exceptions.throwArgumentException('', 'payload');
            return;
        }

        if (is.not.function(callback)) {
            exceptions.throwArgumentException('', 'callback');
            return;
        }
        // actually replace an order
        collection.findAndModify({"email": email},[],{$setOnInsert: { "email": email} },{ upsert:true}, callback);
        collection.update( {"email" : email, "items.title" : payload.title },{$inc : {"items.$.quantity" : 1, "total_quantity" : 1}} ,{upsert:false }, callback);
        collection.update({email : email , "items.title" : { $ne : payload.title}},
                    {$addToSet : {"items" : {"title" : payload.title, "price" : payload.price , "quantity" : 1 }},$inc : {"total_quantity" : 1}},
                           {upsert:false}, callback);
    };

    self.getCount = function (email,callback) {
        if (is.not.string(email)) {
            exceptions.throwArgumentException('', 'payload');
            return;
        }

        if (is.not.function(callback)) {
            exceptions.throwArgumentException('', 'callback');
            return;
        }

        collection.find({"email" : email}).next (function (err, doc) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, doc);
        });
    };
    return self;
};
