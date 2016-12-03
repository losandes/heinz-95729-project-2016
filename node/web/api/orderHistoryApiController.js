module.exports.name = 'orderHistoryApiController';
module.exports.dependencies = ['router', 'orderHistoryRepo', 'exceptions'];
module.exports.factory = function (router, repo, exceptions) {
    'use strict';
    router.get('/api/orderHistory/:userId', function (req, res) {
        repo.get(req.params.userId, function (err, orderHistory) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }
            res.send(orderHistory);
        });
    });
    return router;
};
