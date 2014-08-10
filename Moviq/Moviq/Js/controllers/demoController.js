/*global define*/

define('controllers/demoController', { init: function (routes, viewEngine, CodropsGridVw) {
    "use strict";
    
    routes.get(/^\/demos\/grid\/?/i, function (context) {  // /demos\/grid\/?/i
        var view;
        view = new CodropsGridVw();
        view.message = 'hello world!';
        viewEngine.setView(view);
    });
    
}});
