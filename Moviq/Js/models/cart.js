/*jslint plusplus: true*/
/*global define*/
define('models/cart', { init: function (ko, CartItem) {
    "use strict";
    alert("Initializing cart");
    if (!ko) {
        throw new Error('Argument Exception: ko is required to init the books module');
    }
    
    if (!CartItem) {
        throw new Error('Argument Exception: CartItem is required to init the books module');
    }
    
    var Cart;

    Cart = function (cart) {
        var $this = this;

        $this.cart = ko.observableArray();

        $this.addCartItem = function (cartItem) {
            alert("TESTING - ADDED");
            if (!cartItem) {
                throw new Error('Argument Exception: the argument, book, must be defined to add a book');
            }

            var i = 0;

            if (!(cartItem instanceof CartItem)) {
                cartItem = new CartItem(cartItem);
            }

            $this.cart.push(cartItem);
        };

        $this.addCart = function (cart) {
            if (!cart) {
                throw new Error('Argument Exception: the argument, books, must be defined to add books');
            }

            var i = 0;

            for (i; i < cart.length; i++) {
                $this.addCartItem(cart[i]);
            }
        };

        if (cart) {
            $this.addCart(cart);
        }
    };

    return Cart;
}
});
