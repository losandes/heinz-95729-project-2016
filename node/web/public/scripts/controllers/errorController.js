Hilary.scope('heinz').register({
	name: 'errorController',
	dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'Products', 'jQuery'],
	factory: function ($this, GidgetRoute, locale, viewEngine, Products, $) {
		'use strict';

		$this.get['/report'] = new GidgetRoute({
			routeHandler: function (err, req) {
				$.ajax({
					url: '/api/report/?error=' + req.uri.query.error,
					method: 'GET'
				}).done(function (data) {
					viewEngine.setVM({
						template: 't-report-reg',
						data: {
							report: data
						}
					});
				});
			}
		});

		return $this;
	}
});
