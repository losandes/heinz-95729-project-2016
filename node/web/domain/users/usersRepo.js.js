module.exports.name = 'usersRepo';
module.exports.singleton = true;
//module.exports.blueprint = ['repoBlueprint'];
module.exports.dependencies = ['db', 'User', 'Blueprint', 'exceptions', 'is'];
module.exports.factory = function (db, User, Blueprint, exceptions, is) {
    'use strict';

    var self = {
            get: undefined,
            find: undefined,
            create: undefined,
            update: undefined,
            remove: undefined,
            getCount: undefined

        },
        collection = db.collection(User.db.collection),
        i;

    // ensure the indexes exist
    for (i = 0; i < User.db.indexes.length; i += 1) {
        collection.createIndex(User.db.indexes[i].keys, User.db.indexes[i].options);
    }

    /*
    // Get a single user
    */
    self.get = function (email, callback) {
        if (is.not.string(email)) {
            exceptions.throwArgumentException('', 'uid');
            return;
        }

        if (is.not.function(callback)) {
            exceptions.throwArgumentException('', 'callback');
            return;
        }

        collection.find({ email: email }).limit(1).next(function (err, doc) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, new User(doc));
        });
    };

    /*
    // Create a user
    */
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

    self.update = function (email,product, callback) {
        if (is.not.string(email)) {
            exceptions.throwArgumentException('', 'payload');
            return;
        }
        if (is.not.string(product)) {
            exceptions.throwArgumentException('', 'payload');
            return;
        }
        if (is.not.function(callback)) {
            exceptions.throwArgumentException('', 'callback');
            return;
        }

        collection.updateOne(
          {email : email},
          {
            $push: { "products": product },
            $inc: { "quantity": 1}
          }
          , callback);
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

        collection.find({email : email},{ _id:0, quantity: 1}).next (function (err, doc) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, doc);
        });
    };
    return self;
};