module.exports.name = 'booksApiController';
module.exports.dependencies = ['router', 'productsRepo', 'exceptions'];
module.exports.factory = function (router, repo, exceptions) {
    'use strict';

    router.get('/api/books/search', function (req, res) {
        repo.find({ query: { $text: { $search: req.query.q }, type: 'book' } }, function (err, books) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }
            res.send(books);
        });
    });

    router.get('/api/books/:uid', function (req, res) {
        repo.get(req.params.uid, function (err, book) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }

            res.send(book);
			productsRepo.find({query: {uid: req.body.uid, type: 'book' }}, function (err, books) {
				if (err) {
					res.redirect('/report?error=' + "db");
					return;
				}

				if (!books) {
					// Books not found
					res.redirect('/report?error=' + "nosuchbook");
					return;
				}

				checkoutRepo.remove(userId, books, function(err) {
					if (err) {
						res.redirect('/report?error=' + "db");
						return;
					}
				})
			});
        });
    });

    return router;
};
