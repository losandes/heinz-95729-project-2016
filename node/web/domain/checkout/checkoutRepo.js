/*
// See the README.md for info on this module
*/
module.exports.name = 'checkoutRepo';
module.exports.singleton = true;
//module.exports.blueprint = ['repoBlueprint'];
module.exports.dependencies = ['db', 'Checkout', 'Blueprint', 'exceptions', 'is'];
module.exports.factory = function (db, Checkout, Blueprint, exceptions, is) {
    'use strict';

    var self = {
            get: undefined,
            find: undefined,
            create: undefined,
            update: undefined,
            remove: undefined
        },
        collection = db.collection(Checkout.db.collection),
        findOptionsBlueprint,
        i;

    // ensure the indexes exist
    for (i = 0; i < Checkout.db.indexes.length; i += 1) {
        collection.createIndex(Checkout.db.indexes[i].keys, Checkout.db.indexes[i].options);
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
    // Get a single Checkout
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
        collection.find({ userId: userId }).limit(1).next(function (err, doc) {
            if (err) {
                callback(err);
                return;
            }

			if (doc) {
				callback(null, new Checkout(doc));
			} else {
				callback(null, null);
			}
        });
    };

    self.update = function (userId, books, callback) {

    if (is.not.string(userId)) {
			exceptions.throwArgumentException('', 'userId');
			return;
		}
/*
    	if (is.not.object(books)) {
			exceptions.throwArgumentException('', 'update books');
			return;
		}
*/
		if (is.not.function(callback)) {
			exceptions.throwArgumentException('', 'callback');
			return;
		}


    collection.update(
      {"userId": userId},
      {$pull: {"books": {"uid": books[0].uid}}, function(err, data) {
        }}
       );

		collection.update(
			{"userId": userId},
			{$push: {"books": { $each: books }}}
		, callback)
	};

     /*
    // Create a shopping cart for a user
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

//        collection.deleteOne({"book.uid": payload.book.uid , "userId": payload.userId },callback );

        collection.insertOne(payload, callback);
    };

    /*
   // Deleate a shopping cart for a user
   */

   self.remove = function (userId, uid, callback) {

       if (is.not.function(callback)) {
           exceptions.throwArgumentException('', 'callback');
           return;
       }

       collection.update(
         {userId: userId},
         {$pull: {books: {uid: uid}}}
          );

   };

   /*
  // update a shopping cart status for one element
  */

  self.updateStatus = function (userId, uid, status, callback) {

      if (is.not.function(callback)) {
          exceptions.throwArgumentException('', 'callback');
          return;
      }

      collection.update(
        {userId: userId},
        {$pull: {books: {uid: uid}}}
         );

  };


    return self;
};
