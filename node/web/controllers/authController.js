module.exports.name = 'authController';
module.exports.dependencies = ['router', 'usersRepo'];
module.exports.factory = function (router, repo) {
    'use strict';

    var authCookieExpiryDurationMinutes = 43200, // 30 days
        maxAge = authCookieExpiryDurationMinutes * 60 * 1000,
        addCookie,
        cleanCookie;

    addCookie = function (user, res) {
        // normally, you wouldn't set a plain old user object as the
        // value of the cookie - it's not secure.
        res.cookie('auth', user, { maxAge: maxAge, httpOnly: true });
    };

    cleanCookie = function (res) {
        res.clearCookie('auth');
    };

    router.post('/register', function (req, res) {
        req.body.cart = {totalAmount:0, books:[]};
        req.body.orderhistory = {totalAmountOfHistory:0, booksOfHistory:[]};
        repo.create(req.body, function (err, result) {
            if (!err && result.insertedId) {
                repo.get(req.body.email, function (err, user) {
                    if (!err) {
                        console.log('orderhistory: ', user.orderhistory);
                        addCookie(user, res);
                        res.redirect('/home');
                    } else {
                        res.status(400);
                    }
                });
            } else {
                res.redirect('/registerWithError');
                //res.status(400);
            }
        });
    });

    router.post('/login', function (req, res) {
        console.log('req.cookies login: ', req.cookies);
        console.log('req.body login: ', req.body);
        repo.get(req.body.email, function (err, user) {
            if (!err) {
                addCookie(user, res);
                res.redirect('/');
            } else {
                res.redirect('/loginWithError');
                //res.status(400);
            }
        });
    });

    router.get('/logincheck', function (req, res) {
        //console.log('req.body: ', req.body);
        //console.log('req.cookies:', req.cookies.auth.email);
        if ( req.cookies.auth === undefined) {
            res.send('404');
        } else {
            console.log('error checking user in db.');
            res.send('200');
        }
    });

    //router.post('/loginWithError', function (req, res) {
    //    console.log(req.body);
    //    repo.get(req.body.email, function (err, user) {
    //        if (!err) {
    //            addCookie(user, res);
    //            res.redirect('/');
    //        } else {
    //            res.redirect('/loginWithError');
    //        }
    //    });
    //});

    router.post('/profile', function (req, res) {
        console.log('profile--->', req.body);
        cleanCookie(res);
        res.redirect('/');
    });

    return router;
};
