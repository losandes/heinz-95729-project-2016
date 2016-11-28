module.exports.name = 'checkoutApiController';
module.exports.dependencies = ['router', 'checkoutRepo', 'exceptions'];
module.exports.factory = function (router, repo, exceptions) {
    'use strict';

    

    router.get('/api/checkout/:email', function (req, res) {
        repo.get(req.params.email, function (err, checkout) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }

            res.send(checkout);
        });
    });

    return router;
};
