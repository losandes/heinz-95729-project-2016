Hilary.scope('heinz').register({
    name: 'orderHistoryController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine','Order','Orders','jQuery'],
    factory: function ($this, GidgetRoute, locale, viewEngine, Order, Orders, $) {
        'use strict';
        
        $this.get['/orderHistory/:userId'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/orderHistory/' + req.params.userId
                }).done(function (data) {
                    console.log(data.length);
                    if(data.length>0){
                        var orders = new Orders(data);
                        viewEngine.setVM({
                            template: 't-orderHistory',
                            data: orders
                        });
                        
                    } else {
                        viewEngine.setVM({
                            template: 't-orderHistory-empty'
                        });
                    }
                    

                });
            }
        });
        


        return $this;
    }
});

