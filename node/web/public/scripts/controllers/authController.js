Hilary.scope('heinz').register({
    name: 'authController',
    dependencies: ['router','newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'User'],
    factory: function (router,$this, GidgetRoute, locale, viewEngine, User) {
        'use strict';

        // GET /#/login
        // login
        $this.get['/login'] = new GidgetRoute({
            routeHandler: function () {
                viewEngine.setVM({
                    template: 't-login',
                    data: new User()
                });
            }
        });
        // GET /#/login
        // login
        $this.get['/Guest'] = new GidgetRoute({
            routeHandler: function () {
                viewEngine.setVM({
                    template: 't-login-guest',
                    data: new User()
                });
            }
        });

        $this.post['/login'] = new GidgetRoute({
            routeHandler: function (err, req) {

                console.log("client side /login get called");
                console.log(req.payload);
                console.log(req.payload.email);
                $.ajax({
                    url: '/login',
                    method: 'POST',
                    data: JSON.stringify({email: req.payload.email}),
                    contentType: 'application/json',
                }).done(function (data) {

                    //console.log(data);
                    // prompt user the result
                    if(data == "error") {
                        alert("No such user. Please try again.");
                        viewEngine.setVM({
                            template: 't-login',
                            data: new User()
                        });
                    } else {
                        router.navigate("/loggedin"+data);
                    }
                });
            }
        });

        $this.post['/Guest'] = new GidgetRoute({
            routeHandler: function (err, req) {

                console.log("client side /Guest get called");
                console.log(req.payload);
                console.log(req.payload.email);
                $.ajax({
                    url: '/Guest',
                    method: 'POST',
                    data: JSON.stringify({email: req.payload.email}),
                    contentType: 'application/json',
                }).done(function (data) {

                    //console.log(data);
                    // prompt user the result
                    if(data == "error") {
                        alert("No such user. Please try again.");
                        viewEngine.setVM({
                            template: 't-login-guest',
                            data: new User()
                        });
                    } else if(data == "mergeFail") {
                        alert("Login failed. Please try again.");
                        viewEngine.setVM({
                            template: 't-login-guest',
                            data: new User()
                        });
                    } else {
                        router.navigate("/loggedin"+data);
                    }
                });
            }
        });

        // GET /register
        // Register a new account
        $this.get['/register'] = new GidgetRoute({
            routeHandler: function () {
                viewEngine.setVM({
                    template: 't-register',
                    data: new User()
                });
            }
        });


        $this.post['/register'] = new GidgetRoute({
            routeHandler: function (err, req) {

                console.log("client side /register get called");
                console.log(req.payload);
                console.log(req.payload.email);
                console.log(req.payload.name);
                if(req.payload.name == "") {
                    // name can not be empty
                    alert("Name cannot be empty. Please try again.");
                    viewEngine.setVM({
                        template: 't-register',
                        data: new User()
                    });

                    return;
                } else if(req.payload.email == "") {
                    alert("Email cannot be empty. Please try again.");
                    viewEngine.setVM({
                        template: 't-register',
                        data: new User()
                    });

                    return;
                } else if(!req.payload.email.includes("@")) {
                    alert("Email must contain an '@'. Please try again.");
                    viewEngine.setVM({
                        template: 't-register',
                        data: new User()
                    });

                    return;
                }

                $.ajax({
                    url: '/register',
                    method: 'POST',
                    data: JSON.stringify({email: req.payload.email,
                                          name: req.payload.name}),
                    contentType: 'application/json',
                }).done(function (data) {

                    if(data == "error") {
                        alert("Email already exists. Please try a different one or login directly.");
                        viewEngine.setVM({
                            template: 't-register',
                            data: new User()
                        });
                    } else {
                        router.navigate("/registered"+data);
                    }
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

                // Set visible links
                vm.$data.isLogin(false);

                router.navigate("/login");
            });
          }
        });
        return $this;
    }
});
