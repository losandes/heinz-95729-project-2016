Hilary.scope('heinz').register({
	name: 'authenticateState',
	factory: function () {
		'use strict';
		var isAuthenticated = false;

		var changeAuthenticateState = function(state) {
			if (state == true) {
				isAuthenticated = true;
				console.log('change isAuthenticated = ' + isAuthenticated);
			} else {
				isAuthenticated = false;
				console.log('change isAuthenticated = ' + isAuthenticated);
			}
		}

		var getAuthenticateState = function() {
			console.log('get isAuthenticated = ' + isAuthenticated);
			return isAuthenticated;
		}

		return {
			changeAuthenticateState: changeAuthenticateState,
			getAuthenticateState: getAuthenticateState
		};
	}
});


