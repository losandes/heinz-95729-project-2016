Hilary.scope('heinz').register({
    name: 'orderDetailsController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'Checkout','Products', 'jQuery'],
    factory: function ($this, GidgetRoute, locale, viewEngine,Checkout, Products, $) {
        'use strict';

        /*$this.get['/orderDetails/:userId'] = function () {
            viewEngine.setVM({
                template: 't-orderDetails',
                
            });
        };*/

       $this.get['/orderDetails/:userId'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/checkout/' + req.params.userId
                }).done(function (data) {
                    if(data){
                        var checkout = new Checkout(data);
                        
                        viewEngine.setVM({
                            template: 't-orderDetails',
                            data: { checkout: checkout }
                        });
                        recalculateCart();
                    }

                });
            }
        });
        

        return $this;
    }
});