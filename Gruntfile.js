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
    },

    karma: {
        unit: {
            configFile: 'karma.conf.js',
            autoWatch: true,
            reporters: ['dots']
        },
        ci: {
            configFile: 'karma.conf.js',
            reporters: ['junit', 'dots'],
            singleRun: true
        }
    },
  });

  grunt.registerTask('default', ['jslint', 'karma:ci']);

}