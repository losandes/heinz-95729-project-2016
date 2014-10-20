/*global jQuery, sinon*/

(function ($, sinon) {
    "use strict";

    sinon.ajaxStub = function (data, timeout, reject) {
        if (!data) {
            throw new Error('data must be provided to stub an ajax request');
        }
        
        timeout = timeout || 0;
        
        return sinon.stub($, 'ajax', function (options) {
            var deferred = $.Deferred();

            if (options.success && (data.data || data.status || data.jqXHR)) {
                deferred.done(options.success(data.data, data.status, data.jqXHR));
            } else if (options.success) {
                deferred.done(options.success(data));
            }

            if (options.error && (data.jqXHR || data.status || data.errorThrown)) {
                deferred.fail(options.fail(data.jqXHR, data.status, data.errorThrown));
            } else if (options.error) {
                deferred.fail(options.fail(data));
            }

            if (options.always && (data.jqXHR || data.status)) {
                deferred.always(options.always(data.jqXHR, data.status));
            } else if (options.always) {
                deferred.always(options.always(data));
            }

            deferred.success = deferred.done;
            deferred.error = deferred.fail;

            if (timeout > -1 && (reject === undefined || reject === false)) {
                setTimeout(function () {
                    deferred.resolve(data);
                }, timeout);
            } else if (timeout > -1 && reject === true) {
                setTimeout(function () {
                    deferred.reject(data);
                }, timeout);
            }

            return deferred;
        });
    };
    
}(jQuery, sinon));
