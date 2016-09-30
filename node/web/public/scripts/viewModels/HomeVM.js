Hilary.scope('heinz').register({
    name: 'HomeVM',
    dependencies: ['jQuery', 'ko', 'router'],
    factory: function ($, ko, router) {
        'use strict';

        var HomeVM;

        HomeVM = function () {
            var self = {
                    searchString: undefined,
                    go: undefined,
                    onSearchInputChanged: undefined
                },
                oldSearchString;

            self.searchString = ko.observable('');
            self.go = function () {
                if (self.searchString().length) {
                    router.navigate('/search/?q=' + self.searchString());
                    oldSearchString = self.searchString();
                } else {
                    router.navigate('/');
                }
            };

            // subscribe to self.searchString, and auto-search when it changes
            self.onSearchInputChanged = ko.computed(function () {
                if (self.searchString() !== oldSearchString) {
                    self.go();
                }
            });

            // but don't auto-search more than twice per second
            self.onSearchInputChanged.extend({ rateLimit: 500 });


            self.cartCount = ko.observable();
            self.isLogin = ko.observable(false);

            self.setIslogin = ko.computed(function() {

                var cookie = window.document.cookie;
                console.log("Guest cookie"+cookie);
                if(cookie != null &&  cookie != "email=Guest" && cookie != "")
                {
                    self.isLogin(true);
                }                

            });

            // self.updateCartCount = ko.computed(function() {

            //     $.ajax({
            //             url: '/api/count',
            //             method: 'GET'
            //     }).done(function (data) {
                          
            //         // Get the view model for id="cart-count" and update value
            //         // var cart = document.getElementById("cart-count");
            //         // var vm = ko.contextFor(cart);
            //         self.cartCount(data);             
            //     });
            // });

            // // Check number of cart items per second?
            // self.updateCartCount.extend({ rateLimit: 1000 });

            

            return self;
        };

        return HomeVM;
    }
});
