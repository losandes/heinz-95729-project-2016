Hilary.scope('heinz').register({
    name: 'orderDetailsController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'OrderDetails', 'jQuery'],
    factory: function ($this, GidgetRoute, locale, viewEngine,OrderDetails, $) {
        'use strict';

        /*$this.get['/orderDetails/:userId'] = function () {
            viewEngine.setVM({
                template: 't-orderDetails',
                
            });
        };*/

       $this.get['/orderDetails/:userId'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/orderDetails/' + req.params.userId
                }).done(function (data) {
                    console.log(data);
                    if(data){
                        var orderDetails = new OrderDetails(data);
                        
                        viewEngine.setVM({
                            template: 't-orderDetails',
                            data: { orderDetails: orderDetails }
                        });
                        recalculateCart();
                    }

                });
            }
        });
        

        return $this;
    }
});