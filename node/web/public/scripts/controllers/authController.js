Hilary.scope('heinz').register({
    name: 'authController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine'],
    factory: function ($this, GidgetRoute, locale, viewEngine) {
        'use strict';

		function convert_error_to_string(type) {
			if (type === '1') {
				return 'The email cannot be null';
			} else if (type === '2') {
				return 'The email is already registered';
			} else if (type === '3') {
				return 'Database internal error';
			}
		}

		$this.get['/error_reg'] = new GidgetRoute({
			routeHandler: function (err, req) {
				viewEngine.setVM({
					template: 't-error-reg',
					data: {warning: convert_error_to_string(req.uri.query.q)}
				});
			}
		});

		$this.get['/succ_reg'] = new GidgetRoute({
			routeHandler: function (err, req) {
				viewEngine.setVM({
					template: 't-succ-reg',
					data: {info: 'Successfully Register a new account'}
				});
			}
		});

		$this.get['/succ_login'] = new GidgetRoute({
			routeHandler: function (err, req) {
				viewEngine.setVM({
					template: 't-succ-login',
					data: {info: 'Successfully Login'}
				});
			}
		});

		$this.get['/error'] = new GidgetRoute({
			routeHandler: function () {
				viewEngine.setVM({
					template: 't-error',
					data: {}
				});
			}
		});

        // GET /#/login
        // login
        $this.get['/login'] = new GidgetRoute({
            routeHandler: function () {
                viewEngine.setVM({
                    template: 't-login',
                    data: {}
                });
            }
        });

        // POST /login
        // login
        $this.post['/login'] = new GidgetRoute({
            routeHandler: function () {
                return true; // ignore
            }
        });

        // GET /register
        // Register a new account
        $this.get['/register'] = new GidgetRoute({
            routeHandler: function () {
                viewEngine.setVM({
                    template: 't-register',
                    data: {}
                });
            }
        });

		$this.get['/error_login'] = new GidgetRoute({
			routeHandler: function () {
				viewEngine.setVM({
					template: 't-error-login',
					data: {info: "Login Failed. Please retry."}
				});
			}
		});

		$this.get['/succ_login'] = new GidgetRoute({
			routeHandler: function () {
				viewEngine.setVM({
					template: 't-succ-login',
					data: {info: "Login Succeed."}
				});
			}
		});

        return $this;
    }
});
