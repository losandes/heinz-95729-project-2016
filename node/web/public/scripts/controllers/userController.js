Hilary.scope('heinz').register({
	name: 'userController',
	dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'Products', 'jQuery', 'HomeVM'],
	factory: function ($this, GidgetRoute, locale, viewEngine, Products, $, HomeVM) {
		'use strict';

		$this.get['/users'] = new GidgetRoute({
			routeHandler: function (err, req) {
				$.ajax({
					url: '/api/users/?q=' + req.uri.query.q,
					method: 'GET'
				}).done(function (data) {
					//authenticateState.changeAuthenticateState(true);
					//authState.alreadyAuthentication();
					HomeVM.setAuthenticated();
				});
			}
		});

		return $this;
	}
});
