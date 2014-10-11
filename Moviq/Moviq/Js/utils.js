/*jslint plusplus: true*/
/*global define*/

define('utils', { init: function ($) {
    "use strict";
    
    var getRandomString;
    
    getRandomString = function (length) {
        var text = '',
            possible = 'abcdefghijklmnopqrstuvwxyz',
            i;

        for (i = 0; i < (length || 5); i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    };
    
    return {
        getRandomString: getRandomString
    };
    
}});
