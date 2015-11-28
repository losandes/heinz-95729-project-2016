module.exports.name = 'homeController';
module.exports.dependencies = ['router'];
module.exports.factory = function (router) {
    'use strict';

    /* GET home page. */
    router.get('/', function (req, res) {
        if(req.cookies.auth) {
            console.log('I want the / page');
            res.render('index', { title: 'web logged in!' });
        } else {
            res.render('index', { title: 'web no logged in' });
        }
    });

    /* Throw an example error. */
    router.get('/hilary/example/error', function (req, res, next) {
        next('threw example error');
    });

    return router;
};
