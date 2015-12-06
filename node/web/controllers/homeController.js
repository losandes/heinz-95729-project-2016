module.exports.name = 'homeController';
module.exports.dependencies = ['router'];
module.exports.factory = function (router) {
    'use strict';

    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index', { title: 'web1' });
    });

    router.get('/cart', function(req, res) {
        res.render('cart', {title: 'cart'});
    });
    /* Throw an example error. */
    router.get('/hilary/example/error', function (req, res, next) {
        next('threw example error');
    });

    return router;
};
