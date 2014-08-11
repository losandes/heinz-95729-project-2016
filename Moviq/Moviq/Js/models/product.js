/*global define*/
define('models/product', { init: function (ko) {
    "use strict";
    
    if (!ko) {
        throw new Error('the product model requires ko');
    }
    
    var Product;

    Product = function () {
        var $this = this;
        
        $this.setProductData = function (product, productData) {
            if (!product) {
                throw new Error('cannot extend the properties of undefined');
            }
            
            productData = productData || {};
            
            product.id = productData.id || 0;
            product.title = ko.observable(productData.title || undefined);
            product.description = ko.observable(productData.description || undefined);
            product.metadata = ko.observable(productData.metadata || undefined);
            product.price = ko.observable(productData.price || undefined);
            product.thumbnailLink = ko.observable(productData.thumbnailLink || '/images/products/default.png');
            product.thumbnailAlt = 'thumbnail for ' + product.title();
        };
    };
    
    return Product;
}});