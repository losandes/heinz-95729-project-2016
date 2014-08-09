/*global define*/
define('movieModels', { init: function (ko) {
    "use strict";

    var Movie, Actor, movieVw;
        
    Movie = function (movie) {
        var i;
        movie = movie || {};
            
        this.id = movie.id || 0;
        this.title = movie.title || undefined;
        this.description = movie.description || undefined;
        this.metadata = movie.metadata || undefined;
        this.price = movie.price || undefined;
        this.thumbnailLink = movie.thumbnailLink || '/images/movies/default/folder.png';
        this.thumbnailAlt = 'thumbnail for ' + this.title;
        this.actors = [];
        this.trailorLinks = [];
            
        this.addActor = function (actorInstance) {
            if (actorInstance instanceof Actor) {
                this.actors.push(actorInstance);
            } else {
                this.actors.push(new Actor(actorInstance));
            }
        };
            
        this.addTrailorLink = function (link) {
            if (typeof link !== 'string') {
                throw 'links passed into addTrailorLink must be of type, string';
            }
                
            this.trailorLinks.push(link);
        };
        
        this.preview = function () {
            // TODO: 
        };
            
        for (i in movie.actors) {
            if (movie.actors.hasOwnProperty(i)) {
                this.addActor(movie.actors[i]);
            }
        }
            
        for (i in movie.trailorLinks) {
            if (movie.trailorLinks.hasOwnProperty(i)) {
                this.addTrailorLink(movie.trailorLinks[i]);
            }
        }
    }; // /Movie
        
    Actor = function (actor) {
        var i;
        actor = actor || {};
            
        this.id = actor.id || 0;
        this.name = actor.name || undefined;
        this.thumbnailLink = actor.thumbnailLink || '/images/actors/default/folder.png';
        this.movies = [];
        this.picLinks = [];
            
        this.addMovie = function (movie) {
            if (movie instanceof Movie) {
                this.movies.push(movie);
            } else {
                this.movies.push(new Movie(movie));
            }
        };
            
        this.addPicLink = function (link) {
            if (typeof link !== 'string') {
                throw 'links passed into addPicLink must be of type, string';
            }
                
            this.picLinks.push(link);
        };
            
        for (i in actor.movies) {
            if (actor.movies.hasOwnProperty(i)) {
                this.addMovie(actor.movies[i]);
            }
        }
            
        for (i in actor.picLinks) {
            if (actor.picLinks.hasOwnProperty(i)) {
                this.addPicLink(actor.picLinks[i]);
            }
        }
    }; // /Actor
        
    movieVw = function (movies) {
        var self = {};
            
        self.movies = ko.observableArray();
        
        if (movies) {
            self.movies(movies);
        }
            
        return self;
    }; // /movieVw
        
    return {
        Movie: Movie,
        Actor: Actor,
        movieVw: movieVw
    };
        
}});