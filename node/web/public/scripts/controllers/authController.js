Hilary.scope('heinz').register({
    name: 'authController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine'],
    factory: function ($this, GidgetRoute, locale, viewEngine) {
        'use strict';

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

		$this.get['/logout'] = new GidgetRoute({
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

        $this.get['/succ_addtoCart'] = new GidgetRoute({
          routeHandler: function (err, req) {
            viewEngine.setVM({
              template: 't-succ-addtoCart',
              data: {info: 'Book added to Cart'} 
            });
          }
        });

        return $this;
    }
});
