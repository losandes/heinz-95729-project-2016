module.exports.name = 'checkoutApiController';
module.exports.dependencies = ['router', 'ordersRepo', 'exceptions', 'stripe','usersRepo'];
module.exports.factory = function (router, repo, exceptions, stripe, usersRepo) {
    'use strict';

    // get order
    router.get('/api/orderHistory', function (req, res) {
        console.log("Oh!!!/api/orderHistory is called");
        //console.log(req);

        // the query should return one order that's supposed to be not completed
        // but return all the orders for simplicity now?
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
        console.log(email);
        usersRepo.get(email, function (err, user) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }

            console.log(user.orders);
            //var orderHistory = new OrderHistory(user.orders);
            console.log("Oh!!!/api/orderHistory query db succeed!\n");

            res.send(user.orders);
        });
    });


    // get order
    router.get('/api/checkout', function (req, res) {
        console.log("Oh!!!/api/checkout is called with req:\n");
        //console.log(req);

        // the query should return one order that's supposed to be not completed
        // but return all the orders for simplicity now?
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
        repo.find({ query: { email: email }}, function (err, orders) {
            if (err) {
                exceptions.throwException(err);
                res.status(400);
                return;
            }

            console.log("Oh!!!/api/checkout query db succeed!\n");

            res.send(orders);
        });
    });


    // save order

    router.post('/api/saveOrder', function (req, res) {

        console.log("a post to /api/saveOrder !!");
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
        repo.update(email, req.body, function (err, result) {
            if (!err) {
                res.send("Success");
            } else {
                res.send("Fail");
            }
        });

    });

    // submit order
    router.post('/api/submitOrder', function (req, res) {

        console.log("a post to /api/submitOrder !!");
        var email = "";
        // currently only save the order, but
        // consider set a flag in the order table to indicate the order has
        // been submitted but the payment is pending
        if(!req.cookies.email)
        {
          email = "Guest";
        }
        else {
          {
            email = req.cookies.email;
          }
        }
        repo.update(email, req.body, function (err, result) {
            if (!err) {
                res.send("Success");
            } else {
                res.send("Fail");
            }
        });

    });

    // payment
    // temporarily put it here
    router.post('/payment', function(req, res) {

        console.log("a post to /api/payment !!");

        var stripeToken = req.body.id;
        // unit: cent
        var amount = req.body.amount * 100;
        // remove too many digits
        amount = Math.round(amount);

        console.log("Will charge cents:"+amount);

        console.log(stripeToken);

        stripe.charges.create({
            card: stripeToken,
            currency: 'usd',
            amount: amount
        },
        function(err, charge) {
            if (err) {
                // send in data rather than status code
                console.log(err);
                res.send("500");
            } else {
                res.send("204");
            }
        });
    });
    router.post('/api/paymentSuccessful', function (req, res) {

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
              repo.find({ query: { email: email }}, function (err, orders) {
                  if (err) {
                      exceptions.throwException(err);
                      res.status(400);
                      return;
                  }

                  console.log("Oh!!!/api/checkout query db succeed!\n");

                  res.send(orders);
              });
              repo.get(email, function (err,doc) {
                  if (err) {
                    //res.status(400);
                    return;
                  }
                  if (doc == null)
                    res.send("no items in the order table");
                    else {
                      repo.remove(email,function (err, doc1) {

                        if (err) {
                        //  res.status(400);
                          return;
                        }
                        else {
                          {
                            console.log("Going to update users table"+ doc.email);
                            usersRepo.update(doc, function (err, doc2) {
                              if (err) {
                                //res.status(400);
                                return;
                              }
                              else {
                              }

                            });
                          }
                        }
                      });
                      }

            });

    });

    return router;
};
