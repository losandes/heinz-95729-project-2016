/*jslint nomen: true*/
/*global define*/
define('models/user', {
    init: function (ko, viewEngine) {
        "use strict";

        if (!ko) {
            throw new Error('Argument Exception: ko is required to init the user module');
        }

        var User = function () {
            var $this = this;

            /*** User attributes ***/
            $this.userId;
            $this.name;
            $this.isGuest;
            $this.orderHistory = [];

            /*** User functions ***/
            $this.setupUser = function () {
                var afterSetUser = $this.getOrders;
                $this.setUser(afterSetUser);
            }
            
            $this.setUser = function(afterSetUserFunction) {                
                $.ajax({
                    url: '/api/examples/context',
                    method: 'GET'
                }).done(function (data) {
                    //Try-catch used here to catch when user is not logged in - the method returns the html for the login page if a user isn't logged in or JSON for the user's info if they are
                    var userGuid = "GUEST";
                    var name = "Guest";
                    var isGuest = true;

                    try {
                        userGuid = JSON.parse(data).Guid;
                        name = JSON.parse(data).Name;
                        isGuest = false;


                    } catch (e) {      
                        console.log("USER MODEL: User not logged in - userId set to: " + userGuid);
                    }
                    $this.userId = userGuid;
                    $this.name = name;
                    $this.isGuest = isGuest;

                    afterSetUserFunction();
                });
                
            }


            $this.getOrders = function (callbackFunction) {
                
                if ($this.userId != "GUEST") {
                    console.log("Get orders");
                    $.ajax({
                        url: '/api/order/get'
                    }).done(function (data) {
                        //console.log(data);
                        var orderIds = JSON.parse(data).orders;
                        console.log(data);
                        if (orderIds !== undefined && orderIds.length > 0) {
                            for(var i=0; i<orderIds.length; i++){
                                $this.orderHistory.push(orderIds[i]);
                            }
                        }
                        console.log($this.orderHistory.length);

                        if (callbackFunction !== undefined) {
                            callbackFunction();
                        }
                    });
                }
            };
            
        };
        
        return User;
    }
});