module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    jslint: {
      source: {
        src: ['index.js'],
        options: {
          failOnError: true
        },
        directives: {}
      }
    }
  });

  grunt.registerTask('default', ['jslint']);

}