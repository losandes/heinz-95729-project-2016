module.exports.name = 'checkoutApiController';
module.exports.dependencies = ['router', 'checkoutRepo', 'exceptions'];
module.exports.factory = function (router, repo, exceptions) {
    'use strict';

    

    router.get('/api/checkout/:userId', function (req, res) {
        repo.get(req.params.userId, function (err, checkout) {
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
