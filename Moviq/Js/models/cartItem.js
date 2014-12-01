/*global define*/
define('models/cartItem', { init: function (ko, Product) {
    "use strict";

    if (!ko) {
        throw new Error('Argument Exception: ko is required to init the book module');
    }
    
    if (typeof Product !== 'function') {
        throw new Error('Argument Exception: Product is required to init the book module');
    }
   
    var CartItem = function (cartItem) {
        var $this = this;
        cartItem = cartItem || {};
        
        $this.setProductData($this, cartItem);
     
       };

    CartItem.prototype = new Product();

    return CartItem;
}
});