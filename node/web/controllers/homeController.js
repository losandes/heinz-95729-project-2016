module.exports.name = 'homeController';
module.exports.dependencies = ['router'];
module.exports.factory = function (router) {
    'use strict';

    /* GET home page. */
    router.get('/', function (req, res) {
		var data = {
			title: 'web',
			waitLogin: true
		}
        res.render('index', data);
    });

    /* Throw an example error. */
    router.get('/hilary/example/error', function (req, res, next) {
        next('threw example error');
    });

    return router;
};
