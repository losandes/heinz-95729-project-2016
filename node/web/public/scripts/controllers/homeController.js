Hilary.scope('heinz').register({
    name: 'homeController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'Products', 'jQuery'],
    factory: function ($this, GidgetRoute, locale, viewEngine, Products, $) {
        'use strict';

      $this.get['/'] = function () {
        $.ajax({
             url: '/api/count',
             method: 'GET'
         }).done(function (data) {
             // Get the view model for id="cart-count" and update value
             var cart = document.getElementById("cart-count");
             var vm = ko.contextFor(cart);
             if (data > 0)
             {
                 vm.$data.cartCount(data);
             }
             viewEngine.setVM({
                 template: 't-empty',
                 data: {
                     heading: locale.pages.home.empty.heading,
                     body: locale.pages.home.empty.body
                 }
             });
         });
          };
          
        $this.get['/registered'] = function () {
             $.ajax({
                  url: '/api/count',
                  method: 'GET'
              }).done(function (data) {
                  // Get the view model for id="cart-count" and update value
                  var cart = document.getElementById("cart-count");
                  var vm = ko.contextFor(cart);
                  vm.$data.isLogin(true);

                  if (data > 0)
                  {
                      vm.$data.cartCount(data);
                  }
                  viewEngine.setVM({
                      template: 't-empty',
                      data: {
                          heading: locale.pages.home.empty.heading,
                          body: locale.pages.home.empty.body
                      }
                  });
              });
        };

        $this.get['/loggedin'] = new GidgetRoute({
          routeHandler: function (err, req) {

            console.log("/loggedin called");

            $.ajax({
                url: '/api/count',
                method: 'GET'
            }).done(function (data) {
                // Get the view model for id="cart-count" and update value
                var cart = document.getElementById("cart-count");
                var vm = ko.contextFor(cart);
                vm.$data.isLogin(true);

                if (data > 0)
                {
                    vm.$data.cartCount(data);
                }
                viewEngine.setVM({
                    template: 't-empty',
                    data: {
                        heading: locale.pages.home.empty.heading,
                        body: locale.pages.home.empty.body
                    }
                });
            });
          }
        });
        // GET /#/search/?q=searchterm
        // search for products
        $this.get['/search'] = new GidgetRoute({
          routeHandler: function (err, req) {
            $.ajax({
                url: '/api/search?q=' + req.uri.query.q,
                method: 'GET'
            }).done(function (data) {
                var results = new Products(data);

                if (results.products().length > 0) {
                    viewEngine.setVM({
                        template: 't-product-grid',
                        data: results
                    });
                } else {
                    viewEngine.setVM({
                        template: 't-no-results',
                        data: { searchterm: req.uri.query.q }
                    });
                }
            });
              // $.ajax({
              //     url: '/api/count',
              //     method: 'GET'
              // }).done(function (data) {
              //   if (data > 0)
              //   {
              //       // Get the view model for id="cart-count" and update value
              //       var cart = document.getElementById("cart-count");
              //       var vm = ko.contextFor(cart);
              //       vm.$data.cartCount(data);
              //   }

              // });

          }
        });

        $this.get['/product'] = new GidgetRoute({
          routeHandler: function (err, req) {
              $.ajax({
                  url: '/api/product?product=' +req.uri.query.product ,
                  method: 'POST'
              }).done(function (data) {
                if (data > 0)
                {
                    // Get the view model for id="cart-count" and update value
                    var cart = document.getElementById("cart-count");
                    var vm = ko.contextFor(cart);
                    vm.$data.cartCount(data);
                }
              });
          }
        });

        return $this;
    }
});
