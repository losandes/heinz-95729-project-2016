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

            /*** User functions ***/

            
            $this.setUser = function () {
                
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
                        console.log("USER MODEL: User not logged in - userId set to GUEST");
                    }
                    $this.userId = userGuid;
                    $this.name = name;
                    $this.isGuest = isGuest;
                });
                
            }
            
        };
        
        return User;
    }
});