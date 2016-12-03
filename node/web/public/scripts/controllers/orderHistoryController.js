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
                    console.log(data);
                    //if(data){
                        var order = new Order(data);
                        
                        viewEngine.setVM({
                            template: 't-orderHistory',
                            data: { order: order }
                        });
                        
                    //} 
                    

                });
            }
        });
        


        return $this;
    }
});

