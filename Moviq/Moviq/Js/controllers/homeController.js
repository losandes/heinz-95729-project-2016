/*global define, JSON*/

define('controllers/homeController', { init: function (routes, viewEngine, Products, Product) {
    "use strict";
    
    // GET /#/search/?q=searchterm
    // search for products
    routes.get(/^\/#\/search\/?/i, function (context) {
        $.ajax({
            url: '/api/search/?q=' + context.params.q,
            method: 'GET'
        }).done(function (data) {
            var results = new Products(JSON.parse(data));

            if (results.products().length > 0) {
                viewEngine.setView({
                    template: 't-product-grid',
                    data: results
                });
            } else {
                viewEngine.setView({
                    template: 't-no-results',
                    data: { searchterm: context.params.q }
                });
            }
        });
    });    
    
    routes.get('/', function (context) {
        viewEngine.setView({
            template: 't-empty',
            message: 'hello word!'
        });
    });
    
}});
