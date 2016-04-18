'use strict';

var gulp = require('gulp');

var paths = gulp.paths;
var sass = require('gulp-sass');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('sdk', function(){
  return gulp.src(paths.sdk + '/dist/*.js')
    .pipe(gulp.dest(paths.src + '/app/components/AppShared/bin/PortalSDK/'));
});

gulp.task('clean', function (done) {
  $.del([paths.dist + '/', paths.tmp + '/'], done);
});
 
gulp.task('sass', function () {
  return gulp.src(paths.src + '/app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.src + '/app/css'));
});

gulp.task('build',['sass','inject', 'sdk', 'watch']);