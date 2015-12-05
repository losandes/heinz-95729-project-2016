module.exports.name = 'paymentApiController';
module.exports.dependencies = ['router', 'exceptions', 'stripe'];
module.exports.factory = function (router, exceptions, stripe) {
    'use strict';
    var chargeCard,
        confirmPayment,
        amount = 400;

    router.post('/api/payment/', function (req, res) {
        console.log(req.body.token);
        chargeCard(req.body.token, req.body.amount, res, function (err) {
            if (!err) {
                res.send({ charged: true });
            } else {
                res.status(400).send({ charged: false });
            }
        });
    });

    chargeCard = function (token, price, res, chargeCardCallback) {
        console.log(price);
        stripe.charges.create({
            amount: price,
            currency: "usd",
            source: token,
            description: "test"
        }, function (err, charge) {
            //console.log(charge.id);
            if (err) {
                console.log("err--->" + err);
                chargeCardCallback(err);
            } else {
                chargeCardCallback(null);
            }
        });
    }


    return router;
};
