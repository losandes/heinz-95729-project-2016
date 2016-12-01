Hilary.scope('heinz').register({
    name: 'HomeVM',
    dependencies: ['jQuery', 'ko', 'router'],
    factory: function ($, ko, router) {
        'use strict';

        var HomeVM;

		//var authenticateState = true;
		var data = {
			searchString: undefined,
			go: undefined,
			onSearchInputChanged: undefined,
			loginUser: ko.observable(''),
			isAuthenticated: ko.observable(false)
		};

        HomeVM = function () {

            var  oldSearchString;

			data.searchString = ko.observable('');
			data.go = function () {
                if (data.searchString().length) {
                    router.navigate('/search/?q=' + data.searchString());
                    oldSearchString = data.searchString();
                } else {
                    router.navigate('/');
                }
            };

            // subscribe to data.searchString, and auto-search when it changes
			data.onSearchInputChanged = ko.computed(function () {
                if (data.searchString() !== oldSearchString) {
					data.go();
                }
            });

            // but don't auto-search more than twice per second
			data.onSearchInputChanged.extend({ rateLimit: 500 });
            return data;
        };

        var setAuthenticated = function() {
        	console.log('I am here: setAuthenticated()');
        	data.isAuthenticated(true);
		}

        return {
        	HomeVM: HomeVM,
			setAuthenticated: setAuthenticated
		};
    }
});
