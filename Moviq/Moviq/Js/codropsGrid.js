/*global define,Grid*/
define('codropsGrid', { init: function (ko, pipeline, mainVw) {
    "use strict";
    var templateName = 't-codrops-grid',
        contentVw;
    
    contentVw = function () {
        var self = {};
        
        self.message = ko.observable();
        
        self.update = function (data) {
            if (data) {
                self.message(data.message);
            }
        };
        
        return self;
    };
    
//    pipeline.registerBeforeHandler(templateName, function () {
//
//    });
    
    // after we get the template, go to the server and get the 
    // data. Also set the new content view model    
    pipeline.registerAfterHandler(templateName, function () {
        mainVw.updateContentVw(contentVw);
        mainVw.data({ message: 'hello world' });
        Grid.init();
    });
}});