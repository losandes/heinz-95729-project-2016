module.exports.name = 'booksApiController';
module.exports.dependencies = ['router', 'productsRepo', 'usersRepo', 'exceptions', 'Cart'];
module.exports.factory = function (router, repo, urepo, exceptions, Cart) {
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
                var cart;
                console.log('server controller addtoCart get called');
                if (req.cookies.cart === undefined) {
                    console.log("come into cookie cart");
                    req.cookies.cart = {};
                    req.cookies.cart.totalAmount = 0;
                    req.cookies.cart.books = [];
                
                    console.log(req.cookies.cart);
                    cart = new Cart(req.cookies.cart);
                    }
                    else {
                          urepo.get(req.cookies.auth.email, function(err, user) {
                            cart = new Cart(user.cart);
                             
                         });
                     }
                    repo.get(req.params.uid, function (err, book) {
                    if (err) {
                        exceptions.throwException(err);
                        res.status(400);
                        return;
                    }
                    console.log(">>>>>>>>>>>>");
                    cart.addToCart(book);
                    urepo.updateCart(req.cookies.auth.email, cart, function(err) {
                        if (err) {
                            console.log("adding book to cart failed");
                            return;
                        }
                        console.log("successfully added a book to cart");
                        res.send(book);
                    });
                   
                });
        }
        // repo.get(req.params.uid, function (err, book) {
        //     console.log('server controller get called');
        //     res.send('success');
        //     });
        
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
