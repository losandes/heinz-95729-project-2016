﻿/*global define, JSON*/
define('controllers/authController', {
    init: function ($, routes, viewEngine) {
        "use strict";

        // GET /#/cartLogin
        // login
        routes.get(/^\/#\/cartLogin\/?/i, function (context) {
            viewEngine.setView({
                template: 't-login',
                data: {
                    redirect: "/#/checkout"
                }
            });
        });

        // GET /#/login
        // login
        routes.get(/^\/#\/login\/?/i, function (context) {
            viewEngine.setView({
                template: 't-login',
                data: { }
            });
        });

        // GET /login
        // login
        routes.get(/^\/login\/?/i, function (context) {
            viewEngine.setView({
                template: 't-login',
                data: {}
            });
        });

        // POST /login
        // login
        routes.post(/^\/login\/?/i, function (context) {
            return true; // ignore
        });
    }
});
