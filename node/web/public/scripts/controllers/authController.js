Hilary.scope('heinz').register({
    name: 'authController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine'],
    factory: function ($this, GidgetRoute, locale, viewEngine) {
        'use strict';

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
        // GET /#/login
        // login
        $this.get['/Guest'] = new GidgetRoute({
            routeHandler: function () {
                viewEngine.setVM({
                    template: 't-login-guest',
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
        // POST /login
        // login
        $this.post['/Guest'] = new GidgetRoute({
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
        return $this;
    }
});
