/*jslint nomen: true*/
/*global define*/
define('models/order', {
    init: function (ko, viewEngine, Product) {
        "use strict";

        if (!ko) {
            throw new Error('Argument Exception: ko is required to init the cart module');
        }

        var Order = function () {
            var $this = this;

            /*** Order attributes ***/
            $this.userId;
            $this.products = ko.observableArray();
            $this.total = ko.computed(function () {
                var total = 0;
                $.each($this.products(), function () { total += this.price() })
                return total;
            });
            $this.orderConfirmation;

            /*** Order functions ***/     
            $this.loadOrder = function (order) {

                $this.orderConfirmation = order.cart;
                $this.userId = order.userId;
                loadProducts(order.prodQuantity);   
            }


            function loadProducts(productsList) {
                console.log(productsList);
                console.log(productsList.length);
                
                for (var key in productsList) {
                    console.log(key);
                    $.ajax({
                        url: "/api/books/" + key
                    }).done(function (data) {
                        $this.products.push(new Product(JSON.parse(data)));
                    });
                }
                
            }

        };

        return Order;
    }
});