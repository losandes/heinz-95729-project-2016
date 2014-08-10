/*global define*/
define('views/viewEngine', { init: function (ko) {
    "use strict";
    
    var mainVw, setView;
    
    mainVw = {
        viewModel: ko.observable()
    };
    
    setView = function (viewModel) {
        if (!viewModel) {
            throw new Error('viewModel is undefined. The mainVw cannot be updated.');
        }
        
        mainVw.viewModel(viewModel);
    };
    
    return {
        // mainVw is a singleton - there will only ever be one
        // it is the master view model that is used for refreshing page content
        mainVw: mainVw,
        
        // setView provides a safter approach to udpating the viewModel 
        // property of the mainVw.
        // @param viewModel (object): The active viewModel
        setView: setView
    };

}});