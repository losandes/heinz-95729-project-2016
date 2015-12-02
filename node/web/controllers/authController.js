
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
        res.clearCookie('auth');
        res.cookie('email', user.email, { maxAge: maxAge, httpOnly: false });
    };


    router.post('/register', function (req, res) {

        repo.create(req.body, function (err, result) {
            if (!err) {
                repo.get(req.body.email, function (err, user) {
                    if (!err) {
                        addCookie(user, res);
                        res.redirect('/registered?user='+user._id);
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
        console.log('Server side /login in authController is called!!');
        repo.get(req.body.email, function (err, user) {
            if (!err) {
                addCookie(user, res);
                res.redirect('/loggedin?user'+user._id);
            } else {
                res.status(400);
            }
        });
    });

    return router;
};
