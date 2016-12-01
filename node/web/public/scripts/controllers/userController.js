Hilary.scope('heinz').register({
	name: 'userController',
	dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'Products', 'jQuery', 'homeVmSingleton'],
	factory: function ($this, GidgetRoute, locale, viewEngine, Products, $, homeVmSingleton) {
		'use strict';

		$this.get['/users'] = new GidgetRoute({
			routeHandler: function (err, req) {
				$.ajax({
					url: '/api/users/?q=' + req.uri.query.q,
					method: 'GET'
				}).done(function (data) {
					homeVmSingleton.signin();
					homeVmSingleton.signUser(data);
				});
			}
		});

		return $this;
	}
});
