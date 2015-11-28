module.exports.name = 'searchApiController';
module.exports.dependencies = ['router', 'productsRepo', 'exceptions'];
module.exports.factory = function (router, repo, exceptions) {
    'use strict';

    router.get('/api/search', function (req, res) {
<<<<<<< HEAD
      console.log(req.query.q);
=======
        console.log("Oh!!!/api/search is called with req:\n");
        //console.log(req);
        
>>>>>>> 51943a542b4e37deff9c601daed0fe82aa221997
        repo.find({ query: { $text: { $search: req.query.q } } }, function (err, books) {
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
