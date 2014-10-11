/*global define, require, window*/

define('jquery', function () {
    "use strict";
    return window.jQuery;
});

define('ko', function () {
    "use strict";
    return window.ko;
});

define('sammy', ['jquery'], function ($) {
    "use strict";
    return $.sammy;
});

require.config({
    baseUrl: '/js',
    paths: {
//        'finch':  'lib/finch.min'
    },
    shim: {
//        'finch': {
//            exports: 'Finch'
//        }
    }
});