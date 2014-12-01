/*global define, JSON*/
define('controllers/profileController', {
    init: function ($, routes, viewEngine,Cart) {
        "use strict";

        var submitRegistration;

        // GET /register
        // Register a new account
        routes.get(/^\/#\/register\/?/i, function (context) {
            viewEngine.setView({
                template: 't-register',
                data: {}
            });
        });

        routes.post(/^\/users\/register\/?/i, function (context) {
            return true; // ignore this route
        });
    }
});
