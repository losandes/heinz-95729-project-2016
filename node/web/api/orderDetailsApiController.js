module.exports.name = 'orderDetailsApiController';
module.exports.dependencies = ['router', 'orderDetailsRepo', 'exceptions'];
module.exports.factory = function (router, repo, exceptions) {
    'use strict';
    router.get('/api/orderDetails/:userId', function (req, res) {
        repo.get(req.params.userId, function (err,orderDetails) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }
            res.send(orderDetails);

        });
    });
    return router;
};
