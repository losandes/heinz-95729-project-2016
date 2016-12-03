module.exports.name = 'authenticationMiddleware';
module.exports.dependencies = ['User'];
module.exports.factory = function (User) {
    'use strict';

    return function (req, res, next) {
        var authCookie = req.cookies.auth;
        if (authCookie) {
            res.locals.user = req.cookies.auth.userId;//new User(authCookie);
			res.locals.isAuthenticated = true;
        } else {
			res.locals.isAuthenticated = false;
		}

        next();
    };
};
