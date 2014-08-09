/*jslint plusplus: true*/
/*global define*/
define('pipeline', { init: function () {
    "use strict";
    
    var pipeline,
        registerBeforeHandler,
        registerBeforeAnyHandler,
        registerAfterHandler,
        registerAfterAnyHandler,
        triggerBefore,
        triggerAfter,
        nameValidationMessage = 'To register a handler, a name (string) must be passed as the first argument',
        handlerValidationMessage = function (numOfArg) { return 'To register a handler, a handler (Function) must be passed as the ' + numOfArg + ' argument'; };
        
    pipeline = { beforeAny: [], afterAny: [], before: {}, after: {} };
    
    registerBeforeHandler = function (name, handler) {
        if (typeof name !== 'string') {
            throw new Error(nameValidationMessage);
        }
        if (typeof handler !== 'function') {
            throw new Error(handlerValidationMessage('second'));
        }
        
        pipeline.before[name] = handler;
    };

    registerAfterHandler = function (name, handler) {
        if (typeof name !== 'string') {
            throw new Error(nameValidationMessage);
        }
        if (typeof handler !== 'function') {
            throw new Error(handlerValidationMessage('second'));
        }
        
        pipeline.after[name] = handler;
    };
    
    registerBeforeAnyHandler = function (handler) {
        if (typeof handler !== 'function') {
            throw new Error(handlerValidationMessage('first'));
        }
        
        pipeline.beforeAny.push(handler);
    };

    registerAfterAnyHandler = function (handler) {
        if (typeof handler !== 'function') {
            throw new Error(handlerValidationMessage('first'));
        }
        
        pipeline.afterAny.push(handler);
    };
    
    triggerBefore = function (oldTemplate, vwContext) {
        var i = 0;
            
        for (i; i < pipeline.beforeAny.length; i++) {
            if (typeof pipeline.beforeAny[i] === 'function') {
                pipeline.beforeAny[i].call(oldTemplate, vwContext);
            }
        }

        if (typeof pipeline.before[oldTemplate] === 'function') {
            pipeline.before[oldTemplate].call(oldTemplate, vwContext);
        }
    };
    
    triggerAfter = function (newTemplate, vwContext) {
        var i = 0;
            
        for (i; i < pipeline.afterAny.length; i++) {
            if (typeof pipeline.afterAny[i] === 'function') {
                pipeline.afterAny[i].call(newTemplate, vwContext);
            }
        }

        if (typeof pipeline.after[newTemplate] === 'function') {
            pipeline.after[newTemplate].call(newTemplate, vwContext);
        }
    };
    
    return {
        registerBeforeHandler: registerBeforeHandler,
        registerBeforeAnyHandler: registerBeforeAnyHandler,
        registerAfterHandler: registerAfterHandler,
        registerAfterAnyHandler: registerAfterAnyHandler,
        triggerBefore: triggerBefore,
        triggerAfter: triggerAfter
    };
    
}});