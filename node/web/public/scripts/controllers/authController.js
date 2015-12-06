Hilary.scope('heinz').register({
    name: 'authController',
    dependencies: ['router','newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine'],
    factory: function (router,$this, GidgetRoute, locale, viewEngine) {
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
        $this.get['/logout'] = new GidgetRoute({
          routeHandler: function (err, req) {
            $.ajax({
                url: '/api/logout',
                method: 'GET'
            }).done(function (data) {
                // clear cart count icon display
                var cart = document.getElementById("cart-count");
                var vm = ko.contextFor(cart);
                vm.$data.cartCount(null);

                router.navigate("/login");
            });
          }
        });
        return $this;
    }
});
