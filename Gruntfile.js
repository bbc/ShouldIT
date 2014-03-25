module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        jslint: {
            source: {
                src: ['index.js'],
                options: {
                    failOnError: true
                },
                directives: {}
            }
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

    grunt.registerTask('default', ['jslint', 'mochaTest']);
    grunt.registerTask('test', ['mochaTest']);

}