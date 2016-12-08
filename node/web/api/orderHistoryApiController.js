module.exports.name = 'orderHistoryApiController';
module.exports.dependencies = ['router', 'orderHistoryRepo', 'exceptions'];
module.exports.factory = function (router, orderHistoryRepo, exceptions) {
    'use strict';
    router.get('/api/orderHistory/:userId', function (req, res) {
		var userId = req.params.userId;
		orderHistoryRepo.get(req.params.userId, function (err, orders) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }

			for (var i = 0; i < orders.length; i++) {
            	var sum = 0;
            	for (var j = 0; j < orders[i].books.length; j++) {
            		sum += orders[i].books[j].price;
				}
				orders[i].total = sum;
			}
            res.send(orders);
        });
    });
    return router;
};
