/*global define,Grid*/
define('views/codropsGridVw', { init: function (ko) {
    "use strict";
    var CodropsGridVw;
    
    CodropsGridVw = function () {
        this.template = 't-codrops-grid';
        this.message = ko.observable();
    };
    
    return CodropsGridVw;
}});