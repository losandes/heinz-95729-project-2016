Hilary.scope('heinz').register({
    name: 'authController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine'],
    factory: function ($this, GidgetRoute, locale, viewEngine) {
        'use strict';

        $this.get['/checkLogin'] = new GidgetRoute({
            routeHandler: function (err,req) {
                $.ajax({
                    url: '/logincheck'
                }).done(function (data) {
                    if (data === '200') {
                        window.location.replace('/profile');
                    } else {
                        window.location.replace('/login');
                    }
                    console.log('client data: ', data);
                });
            }
        });

        $this.get['/login'] = new GidgetRoute({
            routeHandler: function () {
                viewEngine.setVM({
                    template: 't-login',
                    data: {}
                });
            }
        });


        $this.get['/profile'] = new GidgetRoute({
            routeHandler: function () {
                viewEngine.setVM({
                    template: 't-profile',
                    data: { }
                });
            }
        });

        $this.get['/loginWithError'] = new GidgetRoute({
            routeHandler: function () {
                viewEngine.setVM({
                    template: 't-loginWithError',
                    data: { }
                });
            }
        });

        $this.post['/loginWithError'] = new GidgetRoute({
            routeHandler: function () {
                return true; // ignore
            }
        });

        // POST /login
        // login
        $this.post['/login'] = new GidgetRoute({
            routeHandler: function () {
                console.log('err--->')
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
