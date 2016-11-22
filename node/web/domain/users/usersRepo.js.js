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
            remove: undefined
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
		console.log(payload)

		var x = collection.findOne({name: {$eq: payload.name}})
		if (x) {
			console.log(x)
			exceptions.throwArgumentException('', 'same name');
			return;
		}

		if (collection.findOne({email: {$eq: payload.email}})) {
			exceptions.throwArgumentException('', 'same email');
			return;
		}

		if (payload.password[0] == payload.password[1]) {
			exceptions.throwArgumentException('', 'same password');
			return;
		}
		payload.super_permission = False
        collection.insertOne(payload, callback);
    };

    return self;
};
