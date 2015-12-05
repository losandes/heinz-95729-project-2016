/**
 * Created by willQian on 2015/12/3.
 */
module.exports.name = 'buyApiController';
module.exports.dependencies = ['router', 'productsRepo', 'exceptions', 'Cart', 'usersRepo'];
module.exports.factory = function (router, repo, exceptions, Cart, usersRepo) {
    'use strict';

    router.get('/api/book/buy_a_book/:uid', function (req, res) {
        console.log("hahaha");
        var newbook,
            cart;
        repo.get(req.params.uid, function (err, book) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }
            newbook = book;
            //console.log("newbook", newbook);
            usersRepo.get(req.cookies.auth.email, function (err, user) {
                if (!err) {
                    console.log("Success in adding a book");
                    console.log("user---->", user);
                    cart = new Cart(user.cart);
                    console.log("cartBeforAdd----->", cart);
                    cart = cart.addToCart(newbook);
                    console.log("cartAfterAdd----->", cart);
                } else {
                    console.log("Error in adding a book", err);
                }

                usersRepo.updateCart(req.cookies.auth.email, cart, function (err) {
                    if (!err) {
                        console.log("Success in updating a book");
                    }
                });
            });
            res.send(book);
        });
    });


    router.get('/api/book/delete_a_book/:uid', function (req, res) {
        var newbook,
            cart;
        repo.get(req.params.uid, function (err, book) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }
            newbook = book;
            usersRepo.get(req.cookies.auth.email, function (err, user) {
                if (err) {
                    console.log("Error in deleting a book3");
                } else {
                    console.log("Success in deleting a book");
                    cart = new Cart(user.cart);
                    cart = cart.deleteOneFromCart(newbook);
                }

                usersRepo.updateCart(req.cookies.auth.email, cart, function (err) {
                    if (!err) {
                        console.log("Success in deleting a book4");
                    }
                });
            });
            res.send(book);
        });
    });

    router.get('/api/buy', function (req, res) {
        usersRepo.get(req.cookies.auth.email, function (err, user) {
            if (err) {
                console.log("Error in buying a book6");
            } else {
                console.log("Success in buying a book");
                res.send(user.cart);
            }
        });
    });

    return router;
};
