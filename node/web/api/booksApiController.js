module.exports.name = 'booksApiController';
module.exports.dependencies = ['router', 'productsRepo','usersRepo', 'exceptions'];
module.exports.factory = function (router, repo,usersRepo, exceptions) {
    'use strict';

    router.get('/api/books/search', function (req, res) {
        repo.find({ query: { $text: { $search: req.query.q }, type: 'book' } }, function (err, books) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }
            res.send(books);
        });
    });

    router.get('/api/books/:uid', function (req, res) {
        repo.get(req.params.uid, function (err, book) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }

            res.send(book);
        });
    });

    router.post('/api/product', function (req, res) {
      console.log("cookie: "+req.cookies.email);
      var count = "";
      usersRepo.update(req.cookies.email, req.query.product, function (err, user) {
          if (err) {
              res.status(400);
              return;
          }
          usersRepo.getCount(req.cookies.email, function (err,doc) {
              if (err) {
                res.status(400);
                return;
              }
              console.log("Document after update: "+ doc.quantity);
              count = doc.quantity;
              console.log("Value of Count: "+count);
              res.send(String(count));
          });

      });
    });

    return router;
};
