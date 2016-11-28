// This function will be rewritten later
function convert_error_to_string(type) {
	if (type === '1') {
		return 'The email name cannot be null';
	}
}

Hilary.scope('heinz').register({
    name: 'authController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine'],
    factory: function ($this, GidgetRoute, locale, viewEngine) {
        'use strict';

		$this.get['/error_reg'] = new GidgetRoute({
			routeHandler: function (err, req) {
				viewEngine.setVM({
					template: 't-error-reg',
					data: {warning: convert_error_to_string(req.uri.query.q)}
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
                    data: { }
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

		$this.get['/succ'] = new GidgetRoute({
			routeHandler: function () {
				viewEngine.setVM({
					template: 't-regsucc',
					data: {}
				});
			}
		});

        return $this;
    }
});
