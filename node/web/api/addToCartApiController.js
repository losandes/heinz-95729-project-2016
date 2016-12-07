module.exports.name = 'addToCartApiController';
module.exports.dependencies = ['router', 'checkoutRepo', 'productsRepo', 'orderHistoryRepo', 'exceptions'];
module.exports.factory = function (router, checkoutRepo, productsRepo, orderHistoryRepo, exceptions) {
	'use strict';

	var OrderId;
	router.post('/addtoCart', function (req, res) {
		//req.query.q = req.body.uid; //Test only

		var userId = req.cookies.auth.userId;
		console.log(userId);

		//console.log("Find Now");
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

			//console.log("Get Now");
			// Test if the user is valid
			checkoutRepo.get(userId, function (err, result) {
				if (err) {
					res.redirect('/report?error=' + "db");
					return;
				}

				if (result) {
					// Update
					//console.log("Update Now");
					checkoutRepo.update(userId, books, function (err, result) {
						if (!err) {
							res.redirect('/checkout/' + userId);
							return;
						} else {
							res.redirect('/report?error=' + "db");
							return;
						}
					})
				} else {
					// Create
					//console.log("Create Now");
					var checkoutData = {
						"userId": userId,
						"books": books
					}

					checkoutRepo.create(checkoutData, function (err, result) {
						if (!err) {
							res.redirect('/checkout/' + userId);
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

		//console.log("removeCart Now");
		checkoutRepo.get(userId, function (err, books) {
			if (err) {
				res.redirect('/report?error=' + "db");
				return;
			}
			//console.log("Here we found" + books);
			if (!books) {
				// Books not found
				res.redirect('/report?error=' + "nosuchbook");
				return;
			}

			if (OrderId === undefined) {
				OrderId = 0;
			} else {
				OrderId++;
			}

			var date = new Date();
			var createHistory = {
				books: books.books,
				orderId: OrderId,
				userId: userId,
				date: date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()
			};

			orderHistoryRepo.create(createHistory, function(err, result) {

			})

			//console.log("Remove");
			// Test if the user is valid
			checkoutRepo.remove_all(userId, function(err) {
				if (err) {
					res.redirect('/report?error=' + "db");
					return;
				}
			})


		});
	});

	router.post('/removeItem', function (req, res) {
		//req.query.q = req.body.uid; //Test only

		var userId = req.cookies.auth.userId;

		//console.log("removeCart Now");
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

	return router;
};
