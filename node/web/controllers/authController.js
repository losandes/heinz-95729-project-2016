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
		//console.log(req.email)

		if (req.body.email == "" || req.body.name == "" ||
			req.body.userId == "") {
			res.redirect('/report?error=' + "invalid");
			return;
		}

		repo.create(req.body, function (err, result) {
			if (!err && result.insertedId) {
				res.redirect('/succ_reg');
				return;
			} else {
				if (err.message.indexOf("unq.users.email") >= 0) {
					res.redirect('/report?error=' + "email");
					return;
				} else if (err.message.indexOf("unq.users.id") >= 0) {
					res.redirect('/report?error=' + "userId");
					return;
				} else {
					res.redirect('/report?error=' + "db");
					return;
				}
				return;
			}
		});
    });

    router.post('/login', function (req, res) {
        repo.get(req.body.email, req.body.userId, function (err, doc) {
			if (err) {
				res.redirect('/report?error=' + "db");
				return;
			}

        	if (!doc) {
				res.redirect('/report?error=' + "login");
				return;
			} else {
				addCookie(doc, res);
				res.redirect('/succ_login');
				return;
			}
        });
    });

	router.post('/succ_reg', function (req, res) {
		//console.log("test cookie" + req.cookies.auth.userId);
		res.redirect('/login');
		return;
	});

	router.post('/succ_login', function (req, res) {
		//console("login" + req.cookies)
		res.redirect('/index');
		return;
	});

	router.get('/logout', function (req, res) {
		res.cookie('auth', req.cookies.auth, { maxAge: 0, httpOnly: true });
		res.redirect("/index");
	})

    return router;
};
