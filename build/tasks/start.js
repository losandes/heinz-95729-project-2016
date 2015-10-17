/*jslint node: true*/
var Spawner = require('./Spawner'),
    async = require('async');

module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('start', 'starts the app', function () {
        var spawner = new Spawner(),
            done = this.async(),
            isWin = /^win/.test(process.platform),
            makeAction,
            doneHandler,
            series = [];

        makeAction = function (path) {
            return function (callback) {
                spawner.spawnThis('npm', ['start'], { cwd: path }, callback);
            };
        };

        doneHandler = function (err, results) {
            var i;

            if (err) {
                console.error(err);
            } else {
                for (i = 0; i < results.length; i += 1) {
                    console.log(results[i]);
                }
            }

            done();
        };

        series.push(function (callback) {
            spawner.spawnThis('dnx', ['kestrel'], { cwd: '../src/App' }, callback);
            // if (isWin) {
            //     spawner.spawnThis('dnx', ['web'], { cwd: '../src/App' }, callback);
            // } else {
            //     spawner.spawnThis('dnx', ['kestrel'], { cwd: '../src/App' }, callback);
            // }
        });

        async.parallel(series, doneHandler);
    });
};
