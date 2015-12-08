/**
 * Created by willQian on 2015/12/3.
 */
module.exports.name = 'buyApiController';
module.exports.dependencies = ['router', 'productsRepo', 'exceptions', 'Cart', 'usersRepo', 'OrderHistory'];
module.exports.factory = function (router, repo, exceptions, Cart, usersRepo, Orderhistory) {
    'use strict';

    router.get('/api/book/buy_a_book/:uid', function (req, res) {
        var newbook,
            cart;
        repo.get(req.params.uid, function (err, book) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }
            newbook = book;
            if (req.cookies.auth === undefined) {
                if (req.session.cart === undefined) {
                    req.session.cart = {};
                    req.session.cart.totalAmount = 0;
                    req.session.cart.books = [];
                }
                req.session.cart = new Cart(req.session.cart);
                req.session.cart = req.session.cart.addToCart(newbook);
            } else {
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
            }

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
            if (req.cookies.auth === undefined) {
                if (req.session.cart === undefined) {
                    req.session.cart = {};
                    req.session.cart.totalAmount = 0;
                    req.session.cart.books = [];
                }
                req.session.cart = new Cart(req.session.cart);
                req.session.cart = req.session.cart.deleteOneFromCart(newbook);
            } else {
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
            }
            res.send(book);
        });
    });

    router.get('/api/buy', function (req, res) {
        var orderhistory;
        if (req.cookies.auth === undefined) {
            if (req.session.cart === undefined) {
                req.session.cart = {};
                req.session.cart.totalAmount = 0;
                req.session.cart.books = [];
            }
            if (req.session.orderhistory === undefined) {
                req.session.orderhistory = {};
                req.session.orderhistory.totalAmountOfHistory = 0;
                req.session.orderhistory.booksOfHistory = [];
            }
            //req.session.orderhistory = new Orderhistory(req.session.orderhistory);
            //req.session.orderhistory = req.session.orderhistory.addToOrderhistory(req.session.cart);
            res.send(req.session);
        } else {
            usersRepo.get(req.cookies.auth.email, function (err, user) {
                if (err) {
                    console.log("Error in buying a book6");
                } else {
                    console.log("Success in buying a book");
                    console.log("User--->" + user.orderhistory.booksOfHistory);
                    orderhistory = new Orderhistory(user.orderhistory);
                    orderhistory = orderhistory.addToOrderHistory(user.cart);
                }
                usersRepo.updateOrderHistory(req.cookies.auth.email, orderhistory, function (err) {
                    if (!err) {
                        console.log("Success in updating order history");
                    }
                });
                res.send(user);
            });
        }
    });

    router.get('/api/cart', function (req, res) {
        var orderhistory;
        if (req.cookies.auth === undefined) {
            if (req.session.cart === undefined) {
                req.session.cart = {};
                req.session.cart.totalAmount = 0;
                req.session.cart.books = [];
            }
            if (req.session.orderhistory === undefined) {
                req.session.orderhistory = {};
                req.session.orderhistory.totalAmountOfHistory = 0;
                req.session.orderhistory.booksOfHistory = [];
            }
            res.send(req.session);
        } else {
            usersRepo.get(req.cookies.auth.email, function (err, user) {
                if (err) {
                    console.log("Error in buying a book6");
                } else {
                    console.log("Success in buying a book");
                    console.log("User--->" + user.orderhistory.booksOfHistory);
                }
                res.send(user);
            });
        }
    });

    router.get('/api/clearcart', function (req, res) {
        var cart;
        if (req.cookies.auth === undefined) {
            req.session.cart = {};
            req.session.cart.totalAmount = 0;
            req.session.cart.books = [];
            res.send(req.session.cart);
        } else {
            usersRepo.get(req.cookies.auth.email, function (err, user) {
                if (err) {
                    console.log("Error in deleting a book3");
                } else {
                    console.log("Success in deleting a book");
                    cart = new Cart(user.cart);
                    cart = cart.cleanCart();
                }
                usersRepo.updateCart(req.cookies.auth.email, cart, function (err) {
                    if (!err) {
                        console.log("Success in cleaning a cart");
                    }
                });
            });
            res.send(cart);
        }
    });


    router.get('/api/book/addToCart/:uid', function (req, res) {
        var newbook,
            cart;
        repo.get(req.params.uid, function (err, book) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }
            //console.log("in here mate"+book);

            newbook = book;
            if (req.cookies.auth === undefined) {
                if (req.session.cart === undefined) {
                    req.session.cart = {};
                    req.session.cart.totalAmount = 0;
                    req.session.cart.books = [];
                }
                req.session.cart = new Cart(req.session.cart);
                req.session.cart = req.session.cart.addToCart(newbook);
                res.send(req.session.cart);
            } else {
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
                res.send(cart);
            }

            //res.send("cc");
            //res.send(book);
        });
    });

    return router;
};
