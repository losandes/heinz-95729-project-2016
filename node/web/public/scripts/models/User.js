Hilary.scope('heinz').register({
    name: 'User',
    singleton: true,
    dependencies: ['router', 'ko', 'Blueprint', 'exceptions'],
    factory: function (router, ko, Blueprint, exceptions) {
        'use strict';

        var User;

        User = function () {
            var self = {};
 
            self.email = ko.observable("");
            self.name = ko.observable("");
            self.canSubmit = ko.observable(true);

            self.requestLogin = function() {

                // disable submit button
                self.canSubmit(false);	
				
				console.log("request login called!");

				// disable submit button
				self.canSubmit(false);

				var userInfo = {
					email: self.email()
                };

                console.log(userInfo);

                router.post("/login", userInfo);

				return false;
            };

            self.requestGuestLogin = function() {

                // disable submit button
                self.canSubmit(false);  
                
                console.log("request login called!");

                // disable submit button
                self.canSubmit(false);

                var userInfo = {
                    email: self.email()
                };

                console.log(userInfo);

                router.post("/Guest", userInfo);

                return false;
            };

            self.requestRegister = function() {
                
                // disable submit button
                self.canSubmit(false);  
                
                console.log("request register called!");

                // disable submit button
                self.canSubmit(false);

                var userInfo = {
                    email: self.email(),
                    name: self.name()
                };

                console.log(userInfo);

                router.post("/register", userInfo);

                return false;
            };

            return self;
        };

        return User;

    }
});


