/*jslint nomen: true*/
/*global define*/
define('models/cart', {
    init: function (ko, viewEngine) {
        "use strict";

        if (!ko) {
            throw new Error('Argument Exception: ko is required to init the product module');
        }

        var Cart = function (cartData) {
            var $this = this;


             $this.title = "Hard coded test string";
             $this.description = cartData;
             $this.products = ko.observableArray();
            
             $this.total = ko.computed(function () {
                 var total = 0;
                 $.each($this.products(), function () { total += this.price() })
                 return total;
             });
             
             $this.addToCart = function (product) {
                 viewEngine.headerVw.addToCart();

                 $this.products.push(product);
                 console.log($this.products()[0]);
             };

             $this.removeFromCart = function (product) {
                 console.log("Remove");
                 console.log(product);
                 viewEngine.headerVw.subtractFromCart();
                 $this.products.remove(product);
             };

        };

        return Cart;
    }
});