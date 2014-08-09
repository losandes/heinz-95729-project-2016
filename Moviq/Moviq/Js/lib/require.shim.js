/*global define, require, window*/

define('jquery', function () {
    "use strict";
    return window.jQuery;
});

define('ko', function () {
    "use strict";
    return window.ko;
});

require.config({
    baseUrl: '/js'
    //paths: {
    //    'jQuery': ['linq.min'],
    //},
});