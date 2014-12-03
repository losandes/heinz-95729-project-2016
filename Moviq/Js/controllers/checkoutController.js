/*global define, JSON*/

define('controllers/checkoutController', {
    init: function ($, routes, viewEngine,Cart) {
    "use strict";

    
routes.get('/#/checkout', function (context) {
    viewEngine.setView({
  template: 't-checkout',
  data: {
      testcart: [
             { title: 'Sample Book', detailsLink: 'http://www.google.com', price: '4.99' },
             { title: 'Sample Book: The Sequel', detailsLink: 'http://www.yahoo.com', price: '5.99' },
             { title: 'Sample Book: The Exciting End of the Trilogy', detailsLink: 'http://www.bing.com', price: '6.99' }
      ]
  }
   });
});

    
}
});