module.exports.name = 'addToCartApiController';
module.exports.dependencies = ['router', 'addToCartRepo', 'exceptions'];
module.exports.factory = function (router, repo, exceptions) {
    'use strict';

//    router.get('/api/books/search', function (req, res) {
//        repo.find({ query: { $text: { $search: req.query.q }, type: 'book' } }, function (err, books) {
//            if (err) {
//                exceptions.throwException(err);
//                res.status(400);
//                return;
//            }
//            res.send(books);
//        });
//    });

    router.post('/addtoCart', function (req, res) {
        repo.find({ query: { $text: { $search: req.query.q }, type: 'book' } }, function (err, books) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }
            res.send(books);
        });
    });




    return router;
};
