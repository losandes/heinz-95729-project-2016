module.exports.name = 'authController';
module.exports.dependencies = ['router', 'usersRepo'];
module.exports.factory = function (router, repo) {
    'use strict';

    var authCookieExpiryDurationMinutes = 43200, // 30 days
        maxAge = authCookieExpiryDurationMinutes * 60 * 1000,
        addCookie;

    addCookie = function (user, res) {
        res.cookie('auth', user, { maxAge: maxAge, httpOnly: true });
    };

    router.post('/register', function (req, res) {
		if (req.body.email == "" || req.body.name == "" ||
			req.body.userId == "") {
			res.redirect('/registerError');
			return;
		}

		repo.create(req.body, function (err, result) {
			if (!err && result.insertedId) {
				var doc = {
					email: req.body.email,
					userId: req.body.userId,
					name: req.body.name
				}
				addCookie(doc, res);
				res.redirect('/index');
				return;
			} else {
				if (err.message.indexOf("unq.users.email") >= 0) {
					res.redirect('/registerError');
					return;
				} else if (err.message.indexOf("unq.users.id") >= 0) {
					res.redirect('/registerError');
					return;
				} else {
					res.redirect('/registerError');
					return;
				}
				return;
			}
		});
    });

    router.post('/login', function (req, res) {
        repo.get(req.body.email, req.body.userId, function (err, doc) {
			if (err) {
				res.redirect('/loginError');
				return;
			}

        	if (!doc) {
				res.redirect('/loginError');
				return;
			} else {
				addCookie(doc, res);
				res.redirect('/index');
				return;
			}
        });
    });

	router.post('/succ_reg', function (req, res) {
		res.redirect('/index');
		return;
	});

	router.get('/logout', function (req, res) {
		res.cookie('auth', req.cookies.auth, { maxAge: 0, httpOnly: true });
		res.redirect("/index");
	})

    return router;
};
