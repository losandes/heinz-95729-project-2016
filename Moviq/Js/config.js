/*global define*/
define('config', { init: function () {
    "use strict";
    
    var config = {};
    
    config.cssClasses = {
        main: 'main'
    };
    
    config.autoCreateSelectors = function () {
        var i;
        
        config.selectors = {};

        for (i in config.cssClasses) {
            if (config.cssClasses.hasOwnProperty(i)) {
                config.selectors[i] = '.' + config.cssClasses[i];
            }
        }
    };
    
    config.autoCreateSelectors();
    
    return config;
}});