
module.exports.name = 'authController';
module.exports.dependencies = ['router', 'usersRepo','ordersRepo'];
module.exports.factory = function (router, repo,ordersRepo) {
    'use strict';

    var authCookieExpiryDurationMinutes = 43200, // 30 days
        maxAge = authCookieExpiryDurationMinutes * 60 * 1000,
        addCookie;

    addCookie = function (user, res) {
        // normally, you wouldn't set a plain old user object as the
        // value of the cookie - it's not secure.
        res.clearCookie('auth');
        res.cookie('email', user.email, { maxAge: maxAge, httpOnly: false });
    };


    router.post('/register', function (req, res) {

        repo.create(req.body, function (err, result) {
            if (!err) {
                repo.get(req.body.email, function (err, user) {
                    if (!err) {
                        addCookie(user, res);
                        res.send("?user="+user._id);
                        // res.redirect('/registered?user='+user._id);
                    } else {
                        // res.status(400);
                        res.send("error");
                    }
                });
            } else {
                res.send("error");
                // res.status(400);
            }
        });
    });

    router.post('/login', function (req, res) {
        console.log('Server side /login in authController is called!!');
        console.log(req.body.email);
        repo.get(req.body.email, function (err, user) {
            if (!err) {
                addCookie(user, res);
                res.send("?user="+user._id);
                //res.redirect('/loggedin?user'+user._id);
            } else {
                res.send("error");
            }
        });
    });

    router.post('/Guest', function (req, res) {
        console.log('Guest login called');
        repo.get(req.body.email, function (err, user) {
            if (!err) {
                ordersRepo.merge(req.body.email, function (err, user) {
                    if (!err)
                    {
                        console.log("ok");
                    } else {
                        //res.status(400);
                        res.send("mergeFail");
                        return;
                    }
                });
                addCookie(user, res);
                res.send("?user="+user._id);
                // res.redirect('/checkout?user'+user._id);
            } else {
                // res.status(400);
                res.send("error");
            }
        });
    });

    // router.post('/Guest', function (req, res) {
    //     console.log('Guest login called');
    //     repo.get(req.body.email, function (err, user) {
    //         if (!err) {
    //             ordersRepo.merge(req.body.email, function (err, user) {
    //               if (!err)
    //               {
    //                 console.log("ok");
    //               }
    //               else {
    //                 res.status(400);
    //               }
    //             });
    //             addCookie(user, res);
    //             res.redirect('/checkout?user'+user._id);
    //         } else {
    //             res.status(400);
    //         }
    //     });
    // });
    router.get('/api/logout', function (req, res) {
                res.clearCookie('email');
                res.send("ok");
    });
    return router;
};
