module.exports.name = 'paymentApiController';
module.exports.dependencies = ['router', 'exceptions', 'stripe'];
module.exports.factory = function (router, exceptions, stripe) {
    'use strict';
    var chargeCard,
        confirmPayment,
        amount = 400;

    router.post('/api/payment/', function (req, res) {
        chargeCard(req.body.token, req.body.amount, res, function (err) {
            if (!err) {
                res.send({ charged: true });
            } else {
                res.status(400).send({ charged: false });
            }
        });
    });

    chargeCard = function (token, price, res, chargeCardCallback) {
        stripe.charges.create({
            amount: price,
            currency: "usd",
            source: token,
            description: "test"
        }, function (err, charge) {
            
            if (err) {
                chargeCardCallback(err);
            } else {
                chargeCardCallback(null);
            }
        });
    }


    return router;
};
