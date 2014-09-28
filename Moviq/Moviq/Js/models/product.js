/*jslint nomen: true*/
/*global define*/
define('models/product', { init: function (ko) {
    "use strict";
    
    if (!ko) {
        throw new Error('Argument Exception: ko is required to init the product module');
    }
    
    var Product = function (product) {
        var $this = this;
        
        $this.setProductData = function (product, productData) {
            if (!product) {
                throw new Error('cannot extend the properties of undefined');
            }
            
            productData = productData || {};
            
            var type = productData._type || 'product';
            
            product.uid = ko.observable(productData.uid);
            product.title = ko.observable(productData.title || undefined);
            product.description = ko.observable(productData.description || undefined);
            product.metadata = ko.observable(productData.metadata || undefined);
            product.price = ko.observable(productData.price || undefined);
            product.images = ko.observableArray();
            product.thumbnailLink = ko.observable(productData.thumbnailLink || '/images/products/default.png');
            product.thumbnailAlt = ko.computed(function () {
                return 'thumbnail for ' + product.title();
            });
            product.detailsLink = ko.computed(function () {
                return '/' + type + '/' + product.uid();
            });
            
            // Ensure updates no more than once per 50-millisecond period
            product.thumbnailAlt.extend({ rateLimit: 50 });
            product.detailsLink.extend({ rateLimit: 50 });
        };
        
        if (product) {
            $this.setProductData($this, product);
        }
    };
    
    return Product;
}});
