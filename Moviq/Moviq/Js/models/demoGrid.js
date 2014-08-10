/*global define,Grid*/
define('models/demoGrid', { init: function (ko) {
    "use strict";
    var DemoGrid;
    
    DemoGrid = function () {
        this.template = 't-codrops-grid';
        this.message = ko.observable();
    };
    
    return DemoGrid;
}});