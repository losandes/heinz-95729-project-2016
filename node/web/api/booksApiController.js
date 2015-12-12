module.exports.name = 'booksApiController';
module.exports.dependencies = ['router', 'productsRepo', 'usersRepo', 'exceptions'];
module.exports.factory = function (router, repo, urepo, exceptions) {
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

     router.get('/api/book/addToCart/:uid', function (req, res) {
        console.log(req.cookies.auth);
         if (req.cookies.auth == undefined) {
           res.send('noUser');
           return;
        }
        else {
                console.log('server controller get called');
                repo.get(req.params.uid, function (err, book) {
                    if (err) {
                        exceptions.throwException(err);
                        res.status(400);
                        return;
                    }

                urepo.updateCart(req.cookies.auth.email, book, function(err, cart) {

                });
        });


            }
        repo.get(req.params.uid, function (err, book) {
            console.log('server controller get called');
            res.send('success');
            });
        });

    router.get('/api/checkout', function (req, res) {
        console.log('checkout cookie: ');
        if (req.cookies.auth == undefined) {
           res.send('noUser');
        }

        urepo.getCart(req.cookies.auth.email, function (err, cart) {
            console.log("after getCart");
            if (cart == "emptyCart") {
                res.send("emptyCart");
            } 

            });
    });

    return router;
};
