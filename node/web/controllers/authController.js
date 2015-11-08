module.exports.name = 'authController';
module.exports.dependencies = ['router', 'usersRepo'];
module.exports.factory = function (router, repo) {
    'use strict';

    var authCookieExpiryDurationMinutes = 43200, // 30 days
        maxAge = authCookieExpiryDurationMinutes * 60 * 1000,
        addCookie;

    addCookie = function (user, res) {
        // normally, you wouldn't set a plain old user object as the
        // value of the cookie - it's not secure.
        res.cookie('auth', user, { maxAge: maxAge, httpOnly: true });
    };


    router.post('/register', function (req, res) {
        repo.create(req.body, function (err, result) {
            if (!err && result.insertedId) {
                repo.get(req.body.email, function (err, user) {
                    if (!err) {
                        addCookie(user, res);
                        res.redirect('/');
                    } else {
                        res.status(400);
                    }
                });
            } else {
                res.status(400);
            }
        });
    });

    router.post('/login', function (req, res) {
        console.log(req.body);
        repo.get(req.body.email, function (err, user) {
            if (!err) {
                addCookie(user, res);
                res.redirect('/');
            } else {
                res.status(400);
            }
        });
    });

    return router;
};
