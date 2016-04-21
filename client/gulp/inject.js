'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

gulp.task('inject', function () {

  var injectStyles = gulp.src([
    paths.src + '/css/**/*.css'
  ], { read: false });

  var injectScripts = gulp.src([
    paths.src + '/{app,components}/**/*.js',
    '!' + paths.src + '/{app,components}/**/*.spec.js',
    '!' + paths.src + '/{app,components}/**/*.mock.js',
    '!' + paths.src + '/{app,components}/**/*.route.js'
  ]).pipe($.angularFilesort());

  var injectRouteScripts = gulp.src([
    paths.src + '/{app,components}/**/*.route.js'
  ]);

  var injectOptions = {
    ignorePath: [paths.src, paths.tmp + '/serve', paths.src + '/app/**/bin/**/*.js'],
    addRootSlash: false
  };

  var wiredepOptions = {
    directory: 'bower_components',
    exclude: [/bootstrap\.js/]
  };

  var injectBin = gulp.src([
    paths.src + '/app/**/bin/**/*.js'
  ]);

  var injectBinOptions = {
    ignorePath: [paths.src, paths.tmp + '/serve'],
    starttag:'<!-- app:js -->',
    addRootSlash: false
  };

  var injectRouteOptions = {
    ignorePath: [paths.src, paths.tmp + '/serve'],
    starttag:'<!-- route:js -->',
    addRootSlash: false
  };


  return gulp.src(paths.src + '/*.html')
    .pipe($.inject(injectBin, injectBinOptions))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe($.inject(injectRouteScripts, injectRouteOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(paths.tmp + '/serve'));

});
