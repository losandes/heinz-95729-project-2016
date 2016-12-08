var chalk = require('chalk');

module.exports = function (grunt) {
    'use strict';

    var printDefinition,
        printHeader,
        printExample;

    printDefinition = function (name, definition, switchList) {
        if (switchList) {
            console.log(chalk.bold.blue(name), chalk.white(definition) + chalk.italic.magenta(' ' + switchList));
        } else {
            console.log(chalk.bold.blue(name), chalk.white(definition));
        }
    };

    printHeader = function (header) {
        console.log(chalk.bold.bgYellow.black(header));
    };

    printExample = function (example) {
        console.log(chalk.white(example));
    };

    grunt.registerTask('help', 'tell me more...', function () {
        console.log('');
        printHeader('Legend');
        printDefinition('command', 'definition/explanation/behavior', 'supported switches');
        console.log('');

        printHeader('Run/Debug Commands');
        printDefinition('grunt start', 'Runs the app, copies and uglifies files, watches for changes');
        console.log('');

        // printHeader('Test/Lint Switches');
        // printDefinition('-os', 'When running tests, you can choose which os you are using to get a different set of browsers.');
        // printDefinition('-os osx', '(default) runs the browser tests in Chrome, Firefox and Safari (same as ``grunt karma:learn-unit-osx``)');
        // printDefinition('-os win', 'runs the browser tests in Chrome, Firefox and IE (same as ``grunt karma:learn-unit-win``)');
        // printDefinition('-os headless', 'runs the browser tests in PhantomJS (same as ``grunt karma:learn-unit-headless``)');
        // console.log('');
        // printDefinition('example for osx', '``$ grunt test-browser``');
        // printDefinition('example for headless', '``$ grunt test-browser -os headless``');
        // console.log('');

        printHeader('Environment Setup Commands');
        printDefinition('grunt install', 'Installs the node and bower dependencies, copies deployable files and modules, and generates CSS and Sprite Sheets');
        printDefinition('grunt clean', 'Clears out installed node and bower dependencies, so we\'re sure to have a clean slate the next time we `grunt install`');
        printDefinition('grunt seed', 'Seed default data to the database');
    });
};
