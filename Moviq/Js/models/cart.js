/*jslint nomen: true*/
/*global define*/
define('models/cart', {
    init: function (ko) {
        "use strict";

        if (!ko) {
            throw new Error('Argument Exception: ko is required to init the product module');
        }

        var Cart = function (cartData) {
            var $this = this;


             $this.title = "Hard coded test string";
             $this.description = cartData;


        };

        return Cart;
    }
});