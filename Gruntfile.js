module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-mocha-test');

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
    }
  });

  grunt.registerTask('default', ['jslint', 'mochaTest']);
  grunt.registerTask('test', ['mochaTest']);

}