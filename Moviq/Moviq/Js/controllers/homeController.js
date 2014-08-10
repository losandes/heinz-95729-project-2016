/*global define*/

define('controllers/homeController', { init: function (routes, viewEngine) {
    "use strict";
    
    routes.get('/', function (context) {
        viewEngine.setView({
            template: 't-empty',
            message: 'hello word!'
        });
    });
    
}});
