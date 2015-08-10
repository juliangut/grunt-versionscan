/*
 * grunt-versionscan
 * https://github.com/juliangut/grunt-versionscan
 *
 * Copyright (c) 2015 Julián Gutiérrez (juliangut@gmail.com)
 * Licensed under the BSD-3-Clasue license.
 */

'use strict';

var path = require('path');
var exec = require('child_process').exec;

module.exports = function(grunt) {

  var attributes = {
    phpVersion: 'php-version',
    sort: 'sort',
    format: 'format',
    output: 'output'
  };
  var flags = {
    failOnly: 'fail-only'
  };

  grunt.registerMultiTask('versionscan', 'Grunt PHP_VERSION scanner', function() {
    var cmd = null;
    var done = null;

    var config = this.options({
      bin: 'versionscan',
      format: 'console'
    });

    if (config.phpVersion !== undefined && !/^[0-9]+((\.[0-9]+)?\.[0-9]+)?$/.test(config.phpVersion)) {
      grunt.verbose.error();
      grunt.fail.warn('PHP version ' + config.phpVersion + ' is not valid.');
    }

    if (config.sort !== undefined) {
      config.sort = config.sort.replace(/^\s+|\s+$/g, '').toLowerCase();

      if (['cve', 'risk'].indexOf(config.sort) === -1) {
        grunt.verbose.error();
        grunt.fail.warn('Sorting by ' + config.sort + ' is not valid.');
      }
    }

    config.format = config.format.replace(/^\s+|\s+$/g, '').toLowerCase();

    if (['console', 'html', 'json', 'xml'].indexOf(config.format) === -1) {
      grunt.verbose.error();
      grunt.fail.warn('Format ' + config.format + ' is not supported.');
    }

    if (config.output !== undefined) {
      config.output = path.normalize(config.output).replace(/\\$/, '');

      if (!grunt.file.exists(config.output)) {
        grunt.verbose.error();
        grunt.fail.warn('Output directory ' + config.output + ' not found.');
      }
      if (!grunt.file.isPathInCwd(config.output)) {
        grunt.verbose.error();
        grunt.fail.warn('Cannot output to a directory outside the current working directory.');
      }
    }

    cmd = path.normalize(config.bin) + ' scan';

    for (var attribute in attributes) {
      if (config[attribute] !== undefined) {
        cmd += ' --' + attributes[attribute] + '=' + config[attribute];
      }
    }

    for (var flag in flags) {
      if (config[flag] !== undefined) {
        cmd += ' --' + flags[flag];
      }
    }

    grunt.log.writeln('Starting versionscan (target: ' + this.target.cyan + ')');
    grunt.verbose.writeln('Execute: ' + cmd);

    done = this.async();

    return exec(cmd, function(err, stdout) {
      if (/^Error: Command failed: .+ No such file or directory\n$/g.test(err)) {
        grunt.fatal(err);
      }

      if (config.output === undefined) {
        grunt.log.write(stdout);
      } else {
        var outputFile = config.output + '/versionscan-output' + (config.format !== 'console' ? '.' + config.format : '');

        if (config.format === 'html') {
          var files = grunt.file.expand({ filter: 'isFile', cwd: config.output }, ['versionscan-output-+([0-9]).html']);
          var generatedFile = config.output + '/' + files[files.length -1];

          stdout = grunt.file.read(generatedFile);
          grunt.file.delete(generatedFile);
        }

        grunt.file.write(outputFile, stdout);
        grunt.log.write('Generating output file ' + outputFile);
      }

      return done();
    });
  });

};
