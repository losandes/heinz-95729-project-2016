/*jslint plusplus: true*/
/*global define*/
define('mainModels', { init: function (ko, pipeline) {
    "use strict";
    
    var mainVw;
    
    mainVw = function () {
        var self = {};
        
        self.template = ko.observable();
        self.data = ko.observable();
        self.contentVw = ko.observable();
        
        self.template.subscribe(function (oldTemplate) {
            pipeline.triggerBefore(oldTemplate, self);
        }, self, 'beforeChange');
        
        self.template.subscribe(function (newTemplate) {
            pipeline.triggerAfter(newTemplate, self);
        });
        
        self.data.subscribe(function (newData) {
            if (typeof self.contentVw().update === 'function') {
                self.contentVw().update(newData);
            }
        });
        
//        self.contentVw.subscribe(function (newData) {
//            if (typeof self.contentVw().update === 'function') {
//                self.contentVw().update(self.data);
//            }
//        });
        
        self.updateContentVw = function (model) {
            var newModel = typeof model === 'function' ? model() : model;
            self.contentVw(newModel);
        };
        
        return self;
    };
    
    return {
        mainVw: mainVw
    };
    
}});