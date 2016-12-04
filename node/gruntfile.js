module.exports = function (grunt) {
    'use strict';

    var os;

    // arguments
    os = grunt.option('os') || 'osx';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    grunt.config('path-to-web', './web');
    grunt.config('path-to-scripts', './web/public/scripts');
    grunt.config('path-to-bower-libs', './web/public/scripts/lib');
    grunt.config('path-to-environment', './web/public/scripts/lib');

    grunt.loadTasks('build-tasks');
    grunt.registerTask('default', ['help']);
};
