module.exports.name = 'addToCartController';
module.exports.dependencies = ['router', 'checkoutRepo','productsRepo','exceptions'];
module.exports.factory = function (router, checkoutrepo, bookrepo, exceptions) {
    'use strict';


    router.post('/addToCart', function (req, res) {
        console.log ('---------------');
        console.log (req.body);

        if (req.body.uid == '' || req.body.userId == '') {
           return;
        }

        bookrepo.get(req.body.uid, function (err, book1) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }

            var newcheckout = {
               userId : req.body.userId,
               book : book1
            };

            checkoutrepo.create(newcheckout, function (err, result) {
              if (!err && result.insertedId) {
                res.redirect('/succ_addtoCart');
                return;
              }
                return;
            });   

        });

        return;
    });




    return router;
};
