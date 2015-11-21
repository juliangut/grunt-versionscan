[![Latest Version](https://img.shields.io/npm/v/grunt-versionscan.svg?style=flat-square)](https://npmjs.org/package/grunt-versionscan)
[![License](https://img.shields.io/github/license/juliangut/grunt-versionscan.svg?style=flat-square)](https://github.com/juliangut/grunt-versionscan/blob/master/LICENSE)

[![Total Downloads](https://img.shields.io/npm/dt/grunt-versionscan.svg?style=flat-square)](https://npmjs.org/package/grunt-versionscan)

# versionscan Grunt plugin

> Grunt plugin for running [versionscan](https://github.com/psecio/versionscan)

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-versionscan --save-dev
```

Make sure you have versionscan installed

```shell
composer require psecio/versionscan
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-versionscan');
```

## The "versionscan" task

### Overview
In your project's Gruntfile, add a section named `versionscan` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  versionscan: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.bin
Type: `String`
Default value: `'versionscan'`

versionscan executable binary.

In case you do not provide versionscan binary path you need to have it on PATH environment variable otherwise plugin will raise an error

#### options.phpVersion
Type: `String`
Default value: `undefined`

PHP version to scan upon. If none provided php-cli PHP_VERSION is used.

#### options.sort
Type: `String`
Default value: `undefined`

Sort results list be `cve` or `risk`

#### options.format
Type: `String`
Default value: `'console'`

Output report format. One of `console`, `html`, `json` or `xml`

#### options.output
Type: `String`
Default value: `undefined`

Output path to save versionscan reports.

Output file name will be versionscan-output

#### options.failOnly
Type: `Boolean`
Default value: `undefined`

Whether only failing checks will be output.

Output file name will be versionscan-output{.format} except for `console` format which won't have extension.

### Usage Example

```js
grunt.initConfig({
  versionscan: {
    all {
      options: {
        phpVersion: '5.3.3',
        sort: 'risk',
        format: 'xml',
        failOnly: true
      }
    }
  },
});
```

## Contributing

Found a bug or have a feature request? [Please open a new issue](https://github.com/juliangut/grunt-versionscan/issues). Have a look at existing issues before.

See file [CONTRIBUTING.md](https://github.com/juliangut/grunt-versionscan/blob/master/CONTRIBUTING.md)

## License

See file [LICENSE](https://github.com/juliangut/grunt-versionscan/blob/master/LICENSE) included with the source code for a copy of the license terms.
