module.exports.name = 'errorApiController';
module.exports.dependencies = ['router', 'usersRepo', 'exceptions'];
module.exports.factory = function (router, repo, exceptions) {
	'use strict';

	router.get('/api/report', function (req, res) {
		console.log(req.query.error);
		if(req.query.error == 'invalid') {
			res.send("Email/UserId/Name cannot be null");
		} else if (req.query.error == 'email') {
			res.send("Email is already registered");
		} else if (req.query.error == 'userId') {
			res.send("userId is already registered");
		} else if (req.query.error == 'db') {
			res.send("DB errors");
		} else {
			res.send("Unknown error")
		}
	});

	return router;
};
