module.exports.name = 'checkoutApiController';
module.exports.dependencies = ['router', 'ordersRepo', 'exceptions'];
module.exports.factory = function (router, repo, exceptions) {
    'use strict';

    // get order
    router.get('/api/checkout', function (req, res) {
        console.log("Oh!!!/api/checkout is called with req:\n");
        //console.log(req);
        
        // the query should return one order that's supposed to be not completed
        // but return all the orders for simplicity now?
        repo.find({ query: { email: "john@gmail.com" }}, function (err, orders) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }

            console.log("Oh!!!/api/checkout query db succeed!\n");

            res.send(orders);
        });
    });



    // save order
    router.post('/api/checkout', function (req, res) {

        console.log("a post to /api/checkout !!");

        repo.update(req.body.email, req.body, function (err, result) {
            if (!err) {
                res.send("Success");
            } else {
                res.send("Fail");
            }
        });

    });

    return router;
};
