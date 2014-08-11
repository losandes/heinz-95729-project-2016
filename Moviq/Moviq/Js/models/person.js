/*global define*/
define('models/person', { init: function (ko) {
    "use strict";
    
    if (!ko) {
        throw new Error('the person model requires ko');
    }
    
    var Person;

    Person = function (person) {
        var $this = this;
        
        $this.setPersonData = function (person, personData) {
            if (!person) {
                throw new Error('cannot extend the properties of undefined');
            }
            
            personData = personData || {};
            
            person.id = ko.observable(personData.id || 0);
            person.name = ko.observable(personData.title || undefined);
            person.description = ko.observable(personData.description || undefined);
            person.images = ko.observableArray();
            person.thumbnailLink = ko.observable(personData.thumbnailLink || '/images/people/default.png');
            person.thumbnailAlt = ko.computed(function () {
                return 'avatar for ' + person.name();
            });
            
            // Ensure updates no more than once per 50-millisecond period
            person.thumbnailAlt.extend({ rateLimit: 50 });
        };
        
        if (person) {
            $this.setPersonData($this, person);
        }
    };
    
    return Person;
}});