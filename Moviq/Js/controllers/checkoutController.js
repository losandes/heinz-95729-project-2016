/*global define, JSON*/

define('controllers/checkoutController', {
    init: function ($, routes, viewEngine) {
    "use strict";

    
    routes.get('/^\/#\/checkout\/?/i', function (context) {
        viewEngine.setView({
            template: 't-register',
            data: {}
        });
    });

  

}
});