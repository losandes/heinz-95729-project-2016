module.exports.name = 'userApiController';
module.exports.dependencies = ['router', 'usersRepo', 'exceptions'];
module.exports.factory = function (router, repo, exceptions) {
	'use strict';

	router.get('/api/users', function (req, res) {
		console.log('GREAT!' + 'query string is ' + req.query.q);
		res.send(req.query.q);
	});

	return router;
};
