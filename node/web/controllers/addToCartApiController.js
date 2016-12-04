module.exports.name = 'addToCartApiController';
module.exports.dependencies = ['router', 'checkoutRepo', 'exceptions'];
module.exports.factory = function (router, repo, exceptions) {
	'use strict';

	router.post('/addtoCart', function (req, res) {
		//req.body
		repo.find({ query: { $text: { $search: req.query.q }, type: 'book' } }, function (err, books) {
			if (err) {
				exceptions.throwException(err);
				res.status(400);
				return;
			}
			res.send(books);
		});
	});




	return router;
};
