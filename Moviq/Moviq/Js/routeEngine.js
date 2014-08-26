/*jslint */
/*global define*/
define('routeEngine', { init: function ($, globalSammy, config, utils) {
    "use strict";
    
    var sammy, listen, addNewRoute, get, post, put, del, any, navigate;
    
    sammy = globalSammy(config.selectors.main, function () {
        this.routablePath = function (path) {
            // By default, sammy strips the query string from the splat and adds it to the context.params (json)
            // That is less useful to us, so we are overriding this behaviour, to maintain the full path
            // return path.replace(QUERY_STRING_MATCHER, '');
            return path;
        };
    });
    
    listen = function () {
        sammy.run();
    };
    
    addNewRoute = function (verb, path, callback) {
        sammy.route(verb, path, callback);
    };

    get = function (path, callback) {
        return addNewRoute('get', path, callback);
    };

    post = function (path, callback) {
        return addNewRoute('post', path, callback);
    };

    put = function (path, callback) {
        return addNewRoute('put', path, callback);
    };

    del = function (path, callback) {
        return addNewRoute('delete', path, callback);
    };

    any = function (path, callback) {
        return addNewRoute('any', path, callback);
    };

//    navigate = function (path) {
//        var id = utils.getRandomString(),
//            anchor = $('<a />').addClass('hidden').attr('href', path).attr('id', id);
//        
//        $('body').append(anchor);
//        
//        $('#' + id).click().remove();
//    };    
    
    navigate = function (path) {
        var anchor = $('<a />').addClass('hidden').attr('href', path);
        
        $('body').append(anchor);
        
        anchor.click().remove();
    };
    
    return {
        get: get,
        post: post,
        put: put,
        del: del,
        any: any,
        listen: listen,
        navigate: navigate
    };

}});