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

		// Test if the email is already registered
		repo.find.ifEmailExists(req.body.email, function (err, doc) {
			if (doc != null) {
				res.redirect('/report?error=' + "email");
			}
			if (err != null) {
				res.redirect('/report?error=' + "db");
			}
		});

		// Test if the userId is already registered
		repo.find.ifUserIdExists(req.body.userId, function (err, doc) {
			if (doc != null) {
				res.redirect('/report?error=' + "userId");
			}

			if (err != null) {
				res.redirect('/report?error=' + "db");
			}
		});

        repo.create(req.body, function (err, result) {
            if (!err && result.insertedId) {
				res.redirect('/succ_reg');
            } else {
				res.redirect('/report?error=' + "db");
            }
        });
    });

    router.post('/login', function (req, res) {
        console.log(req.body);

        repo.get(req.body.email, function (err, user) {
            if (!err) {
                addCookie(user, res);

				repo.finduser(req.body.email, function(name) {
					var data = {
						title: 'FancyBookStore',
						waitLogin: false,
						login_user: name
					}

					res.redirect('/users/?q=' + name);
					//res.render('index', data);
				});
            } else {
				res.redirect('/error_login');
            }
        });
    });

	router.post('/error_reg', function (req, res) {
		res.redirect('/register');
	});

	router.post('/error_login', function (req, res) {
		res.redirect('/login');
	});

	router.post('/succ_reg', function (req, res) {
		res.redirect('/login');
	});

	router.post('/succ_login', function (req, res) {
		res.redirect('/index');
	});

	router.post('/cart', function (req, res) {
		console.log(req.data.book.title);
		res.send(501); //Not implement yet
		//todo
	});

    return router;
};
