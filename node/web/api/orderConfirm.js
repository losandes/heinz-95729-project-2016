module.exports.name = 'orderHistoryApiController';
module.exports.dependencies = ['router', 'orderHistoryRepo', 'checkoutRepo', 'exceptions'];
module.exports.factory = function (router, orderHistoryRepo, checkoutRepo, exceptions) {
    'use strict';

    router.get('/api/orderConfirm', function (req, res) {
		var userId = req.cookies.auth.userId;
		checkoutRepo.find({query: {uid: req.body.uid, type: 'book' }}, function (err, books) {
			if (err) {
				res.redirect('/report?error=' + "db");
				return;
			}
			var historyData = {
				"userId": userId,
				"books": books
			}
			orderHistoryRepo.create(historyData, function(err, result) {
				if (err) {
					res.redirect('/report?error=' + "db");
					return;
				}
			});

			if (!books) {
				// Books not found
				res.redirect('/report?error=' + "nosuchbook");
				return;
			}

			console.log("Remove");
			// Test if the user is valid
			checkoutRepo.remove_all(userId, function(err) {
				if (err) {
					res.redirect('/report?error=' + "db");
					return;
				}
			});


		});
	});

    return router;
};
