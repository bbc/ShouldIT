module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        jshint: {
            all: ['lib/*']
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        },
        watch: {
            scripts: {
                files: ['lib/*.js', 'test/**/*.js'],
                tasks: ['test']
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'mochaTest']);
    grunt.registerTask('test', ['mochaTest']);

}