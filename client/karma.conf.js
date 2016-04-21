// Karma configuration
// Generated on Wed Apr 20 2016 10:55:52 GMT+0800 (CST)

module.exports = function(config) {
  var mainBowerFiles = require('main-bower-files')({
    filter: /\.(js)$/i
  });
  mainBowerFiles.push('bower_components/angular-mocks/angular-mocks.js');

  var sourceFiles = [
    'src/app/app.js',
    'src/app/components/AppShared/AppShared.js',
    'src/app/components/Secure/Secure.js',
    'src/app/**/*.js'
  ];
  var testFiles = ['karma/**/*.js'];
  var allFiles = mainBowerFiles.concat(sourceFiles).concat(testFiles);

  console.log(allFiles);

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: allFiles,

    angularFilesort: {
        whitelist: sourceFiles
    },

    // plugins
    plugins: [
        'karma-chrome-launcher',
        'karma-jasmine'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
