module.exports.name = 'addToCartApiController';
module.exports.dependencies = ['router', 'checkoutRepo', 'productsRepo', 'orderHistoryRepo', 'orderDetailsRepo', 'exceptions'];
module.exports.factory = function (router, checkoutRepo, productsRepo, orderHistoryRepo, orderDetailsRepo, exceptions) {
	'use strict';

	var OrderId;
	router.post('/addtoCart', function (req, res) {
		var userId = req.cookies.auth.userId;
		console.log(userId);

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

			// Test if the user is valid
			checkoutRepo.get(userId, function (err, result) {
				if (err) {
					res.redirect('/report?error=' + "db");
					return;
				}

				if (result) {
					// Update
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

	// Make a payment
	router.post('/removeCart', function (req, res) {
		var userId = req.cookies.auth.userId;

		checkoutRepo.get(userId, function (err, books) {
			if (err) {
				res.redirect('/report?error=' + "db");
				return;
			}
			if (!books) {
				// Books not found
				res.redirect('/report?error=' + "nosuchbook");
				return;
			}

			if (OrderId === undefined) {
				OrderId = 1;
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
				if (err || !result.insertedId) {
					res.redirect('/report?error=' + "db");
					return;
				}
			})

			var orderDetail = {
				books: books.books,
				userId: userId
			}

			orderDetailsRepo.remove_all(userId, function(err) {
				if (err) {
					res.redirect('/report?error=' + "db");
					return;
				}
			})

			orderDetailsRepo.create(orderDetail, function(err, result) {
				if (err || !result.insertedId) {
					res.redirect('/report?error=' + "db");
					return;
				}
			})

			// Test if the user is valid
			checkoutRepo.remove_all(userId, function(err) {
				if (err) {
					res.redirect('/report?error=' + "db");
					return;
				}
			})
		});
	});

	// Remove item from shopping cart
	router.post('/removeItem', function (req, res) {
		var userId = req.cookies.auth.userId;

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
