module.exports.name = 'addToCartApiController';
module.exports.dependencies = ['router', 'checkoutRepo', 'productsRepo', 'exceptions'];
module.exports.factory = function (router, checkoutRepo, productsRepo, exceptions) {
	'use strict';

	router.post('/addtoCart', function (req, res) {
		//req.query.q = req.body.uid; //Test only

		var userId = req.cookies.auth.userId;

		console.log("Find Now");
		productsRepo.find({query: {uid: req.body.uid, type: 'book' }}, function (err, book) {
			if (err) {
				res.redirect('/report?error=' + "db");
				return;
			}

			if (!book) {
				// Books not found
				res.redirect('/report?error=' + "nosuchbook");
				return;
			}

			console.log("Get Now");
			// Test if the user is valid
			checkoutRepo.get(userId, function (err, result) {
				if (err) {
					res.redirect('/report?error=' + "db");
					return;
				}

				if (result) {
					// Update
					console.log("Update Now");
					checkoutRepo.update(userId, book, function (err, result) {
						if (!err) {
							res.redirect('/report?error=' + "addCart");
							return;
						} else {
							res.redirect('/report?error=' + "db");
							return;
						}
					})
				} else {
					// Create
					console.log("Create Now");
					var checkoutData = {
						"userId": userId,
						"books": book
					}

			

					checkoutRepo.create(checkoutData, function (err, result) {
						if (!err) {
							res.redirect('/report?error=' + "addCart");
							return;
						} else {
							res.redirect('/report?error=' + "db");
							return;
						}
					})
				}

			})


		});
	});

	router.post('/removeCart', function (req, res) {
		//req.query.q = req.body.uid; //Test only

		var userId = req.cookies.auth.userId;

		console.log("removeCart Now" + req.body.uid);
		productsRepo.find({query: {uid: req.body.uid, type: 'book' }}, function (err, books) {
			if (err) {
				res.redirect('/report?error=' + "db");
				return;
			}
			console.log("Here we found" + books);
			if (!books) {
				// Books not found
				res.redirect('/report?error=' + "nosuchbook");
				return;
			}

			console.log("Remove");
			// Test if the user is valid
			checkoutRepo.remove(userId, books, function(err) {
				if (err) {
					res.redirect('/report?error=' + "db");
					return;
				}
			})
		});
	});

	return router;
};
