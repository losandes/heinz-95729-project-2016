module.exports.name = 'booksApiController';
module.exports.dependencies = ['router', 'productsRepo','usersRepo','ordersRepo', 'exceptions'];
module.exports.factory = function (router, repo,usersRepo,ordersRepo, exceptions) {
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
      var count = "";
      var bookTitle = "";
      repo.get(req.query.product, function (err, book) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }
            var email = "";
            console.log("Book title: " + book.title);
            if(!req.cookies.email)
            {
              email = "Guest";
            }
            else {
              {
                email = req.cookies.email;
              }
            }
            ordersRepo.updateCart(email,book, function (err, user){
              if (err){
                res.status(400);
                return;
              }
              });
              ordersRepo.getCount(email, function (err,doc) {
                  if (err) {
                    res.status(400);
                    return;
                  }
                  count = doc.total_quantity;
                  res.send(String(count));
            });
        });
    });
    router.get('/api/count', function (req, res) {

      var count = "";
      var bookTitle = "";
      var email = "";
              if(!req.cookies.email)
              {
                email = "Guest";
              }
              else {
                {
                  email = req.cookies.email;
                }
              }
              ordersRepo.getCount(email, function (err,doc) {
                  if (err) {
                    res.status(400);
                    return;
                  }
                  if (doc == null)
                    res.send("0");
                    else {
                      count = doc.total_quantity;
                      res.send(String(count));
                    }

            });

    });
    return router;
};
