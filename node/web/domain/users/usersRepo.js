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
	self.get = function (email, userId, callback) {
		if (is.not.string(email)) {
			exceptions.throwArgumentException('', 'uid');
			return;
		}

		if (is.not.string(userId)) {
			exceptions.throwArgumentException('', 'uid');
			return;
		}

		if (is.not.function(callback)) {
			exceptions.throwArgumentException('', 'callback');
			return;
		}

		collection.findOne({ email: email, userId: userId }, function (err, doc) {
			//console.log(err);
			//console.log(doc);
			callback(err, doc);
		});
	};

    self.find = {
    	 ifEmailExists : function (email, callback) {
			if (is.not.string(email)) {
				exceptions.throwArgumentException('', 'uid');
				return;
			}

			if (is.not.function(callback)) {
				exceptions.throwArgumentException('', 'callback');
				return;
			}

			collection.findOne({ email: email }, function (err, doc) {
				callback(err, doc);
			});
		},

		ifUserIdExists : function (userId, callback) {
			if (is.not.string(userId)) {
				exceptions.throwArgumentException('', 'uid');
				return;
			}

			if (is.not.function(callback)) {
				exceptions.throwArgumentException('', 'callback');
				return;
			}

			collection.findOne({ userId: userId }, function (err, doc) {
				callback(err, doc);
			});
		}
	};

	self.finduser = function (email, callback) {
		if (is.not.string(email)) {
			exceptions.throwArgumentException('', 'uid');
			return;
		}

		if (is.not.function(callback)) {
			exceptions.throwArgumentException('', 'callback');
			return;
		}

		collection.findOne({ email: email }, function (err, doc) {
			if (doc) {
				callback(doc.name);
			} else {
				exceptions.throwArgumentException('', 'doc');
			}
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

    return self;
};
