/*
 * grunt-versionscan
 * https://github.com/juliangut/grunt-versionscan
 *
 * Copyright (c) 2016 Julián Gutiérrez (juliangut@gmail.com)
 * Licensed under the BSD-3-Clasue license.
 */

'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.loadTasks('tasks');

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
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      application: [
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
      custom_attributes: {
        options: {
          phpVersion: '5.5',
          sort: 'risk',
          format: 'html',
          output: './tmp'
        }
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'clean', 'mkdir', 'versionscan']);
};
