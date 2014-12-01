/*global define, JSON*/

define('controllers/checkoutController', {
    init: function ($, routes, viewEngine) {
    "use strict";

    
    routes.get('/#/checkout', function (context) {
        viewEngine.setView({
            template: 't-register',
            data: {}
        });
    });

    
}
});