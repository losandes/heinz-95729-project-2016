/*jslint plusplus: true*/
/*global define*/
define('models/products', { init: function (ko, Product) {
    "use strict";
    
    if (!ko) {
        throw new Error('Argument Exception: ko is required to init the products module');
    }
    
    if (!Product) {
        throw new Error('Argument Exception: Product is required to init the products module');
    }
    
    var Products = function (products) {
        var $this = this;
        $this.products = ko.observableArray();
        
        $this.addProduct = function (product) {
            if (!product) {
                throw new Error('Argument Exception: the argument, product, must be defined to add a product');
            }
            
            if (!product instanceof Product) {
                product = new Product(product);
            }
            
            $this.products.push(product);
        };
        
        $this.addProducts = function (products) {
            if (!products) {
                throw new Error('Argument Exception: the argument, products, must be defined to add products');
            }
            
            var i = 0;
            
            for (i; i < products.length; i++) {
                $this.addProduct(products[i]);
            }
        };
        
        if (products) {
            $this.addProducts(products);
        }
    };
    
    return Products;
}});
