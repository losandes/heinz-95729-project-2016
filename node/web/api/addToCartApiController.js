module.exports.name = 'addToCartApiController';
module.exports.dependencies = ['router', 'checkoutRepo', 'exceptions'];
module.exports.factory = function (router, repo, exceptions) {
    'use strict';

 
router.post('/addtoCart', function (req, res) {
    repo.create(req.body, function (err, result) {
        if (!err && result.insertedId) {
            repo.get(req.body.userID, function (err, userID) {
                if (!err) {
              //
                } else {
                    res.status(400);
                }
            });
        } else {
            res.status(400);
        }
    });
});



    return router;
};
