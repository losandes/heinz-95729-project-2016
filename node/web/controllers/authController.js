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
		//console.log(req)
		//console.log(res)
		req.body.privilege = 'user'
		console.log(req.email)

		if (req.body.email == "") {
			//test:
			// res.redirect('/error_reg')
			res.redirect('/error_reg?q=' + "1");
			return;
		}

        repo.create(req.body, function (err, result) {
            if (!err && result.insertedId) {
                repo.get(req.body.email, function (err, user) {
                    if (!err) {
                        addCookie(user, res);
                        res.send("Register Successfully!")
                    } else {
						//just pass the buck
						res.redirect('/error_reg')
                        //res.status(400);
                    }
                });
            } else {
				//res.status(400);

				res.redirect('/error_reg')
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
				res.send(err)
                //res.status(400);
            }
        });
    });

	router.post('/error_reg', function (req, res) {
		res.redirect('/register');
	});

	router.post('/cart', function (req, res) {
		console.log(req.data.book.title);
		//todo
	});

    return router;
};
