module.exports.name = 'orderHistoryApiController';
module.exports.dependencies = ['router', 'orderHistoryRepo', 'exceptions'];
module.exports.factory = function (router, repo, exceptions) {
    'use strict';
    router.get('/api/orderHistory/:userId', function (req, res) {
        repo.get(req.params.userId, function (err, order) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }
            //console.log(order);
            res.send(order);

        });
    });
    return router;
};
