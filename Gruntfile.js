/*
 * grunt-versionscan
 * https://github.com/juliangut/grunt-versionscan
 *
 * Copyright (c) 2015 Julián Gutiérrez (juliangut@gmail.com)
 * Licensed under the BSD-3-Clasue license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/**/*.js'
      ]
    },

    clean: {
      tests: ['tmp']
    },

    mkdir: {
      tests: {
        options: {
          create: ['tmp']
        }
      }
    },

    versionscan: {
      options: {
        bin: './vendor/bin/versionscan'
      },
      default_options: {
      },
      custon_attributes: {
        options: {
          phpVersion: '5.5',
          sort: 'risk',
          format: 'html',
          output: './tmp',
          failOnly: false
        }
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');

  grunt.registerTask('default', ['jshint', 'clean', 'mkdir', 'versionscan']);

};
