Hilary.scope('heinz').register({
    name: 'homeController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'Products', 'jQuery'],
    factory: function ($this, GidgetRoute, locale, viewEngine, Products, $) {
        'use strict';

      $this.get['/'] = function () {
            viewEngine.setVM({
                template: 't-empty',
                data: {
                    heading: locale.pages.home.empty.heading,
                    body: locale.pages.home.empty.body
                }
            });
          };


        $this.get['/registered'] = function () {
            viewEngine.setVM({
                template: 't-empty',
                data: {
                    heading: locale.pages.home.empty.heading,
                    body: locale.pages.home.empty.body
                }
            });
        };

        $this.get['/loggedin'] = new GidgetRoute({
          routeHandler: function (err, req) {
            $.ajax({
                url: '/api/count',
                method: 'GET'
            }).done(function (data) {
              var cart = document.getElementById("cart");
              cart.style.color = "#fff";
              cart.style.background= "#ff0000";
              cart.style.fontSize= "12px";
              cart.style.padding = "0 5px";
              cart.style.position = "absolute";
              cart.style.marginLeft="-2px";
              cart.style.verticalAlign = top;
              cart.style.borderRadius = "50px 15px";
              cart.innerHTML = "";
              cart.appendChild(document.createTextNode(data));
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
              $.ajax({
                  url: '/api/count',
                  method: 'GET'
              }).done(function (data) {
                var cart = document.getElementById("cart");
        				cart.style.color = "#fff";
        				cart.style.background= "#ff0000";
        				cart.style.fontSize= "12px";
        				cart.style.padding = "0 5px";
        				cart.style.position = "absolute";
        				cart.style.marginLeft="-2px";
        				cart.style.verticalAlign = top;
        				cart.style.borderRadius = "50px 15px";
        				cart.innerHTML = "";
        				cart.appendChild(document.createTextNode(data));
              });

          }
        });

        $this.get['/product'] = new GidgetRoute({
          routeHandler: function (err, req) {
              $.ajax({
                  url: '/api/product?product=' +req.uri.query.product ,
                  method: 'POST'
              }).done(function (data) {
                var cart = document.getElementById("cart");
        				cart.style.color = "#fff";
        				cart.style.background= "#ff0000";
        				cart.style.fontSize= "12px";
        				cart.style.padding = "0 5px";
        				cart.style.position = "absolute";
        				cart.style.marginLeft="-2px";
        				cart.style.verticalAlign = top;
        				cart.style.borderRadius = "50px 15px";
        				cart.innerHTML = "";
        				cart.appendChild(document.createTextNode(data));
              });
          }
        });

        return $this;
    }
});
