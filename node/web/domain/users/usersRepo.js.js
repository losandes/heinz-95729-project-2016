module.exports.name = 'usersRepo';
module.exports.singleton = true;
//module.exports.blueprint = ['repoBlueprint'];
module.exports.dependencies = ['db', 'User', 'Blueprint', 'exceptions', 'is', 'Cart'];
module.exports.factory = function (db, User, Blueprint, exceptions, is, Cart) {
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

        collection.insertOne(payload, callback);
    };
    self.updateCart = function (email, book, callback) {
        console.log("updateCart");
        if (is.not.string(email)) {
            exceptions.throwArgumentException('', 'uid');
            return;
        }
        if (is.not.function(callback)) {
            exceptions.throwArgumentException('', 'callback');
            return;
        }
        var cart = new Cart();
        cart.addToCart(book);

        collection.updateOne(
            { "email": email },
            {$set: {"cart": cart}},
            function(err, results) {callback(err);}
        );
        console.log("Successfully update the cart!!!");
    };
    self.getCart = function(email, callback) {
        console.log("usersRepo getCart");
        console.log(email);
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
            if (doc == null) {
                console.log("doc is empty");
                callback(null, "doc is empty");
                return;
            }
            console.log("doc has something");
            var user = new User(doc);
            console.log(user.cart == undefined)
            if(user.cart == undefined) {
                callback(null, "emptyCart")
            }
            else {
                
            }
        });
       return self;
    };
    self.updateOrderHistory = function (email, orderhistory, callback) {
        if (is.not.string(email)) {
            exceptions.throwArgumentException('', 'uid');
            return;
        }
        if (is.not.function(callback)) {
            exceptions.throwArgumentException('', 'callback');
            return;
        }

        collection.updateOne(
            { "email": email },
            {$set: {"orderhistory": orderhistory}},
            function(err, results) {callback(err);}
        );
        console.log("Successfully update the order history!!!");
    };
    return self;
};
