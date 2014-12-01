/*global define, JSON*/

define('controllers/checkoutController', {
    init: function ($, routes, viewEngine,Cart) {
    "use strict";

    
routes.get('/#/checkout', function (context) {
    viewEngine.setView({
  template: 't-checkout',
  data: {}
   });
});

    
}
});