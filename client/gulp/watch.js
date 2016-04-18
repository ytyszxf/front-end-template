'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

gulp.task('watch', ['inject:watch', 'sass:watch']);

gulp.task('inject:watch', function(){
    gulp.watch([
            paths.src + '/*.html',
            paths.src + '/{app,components}/**/*.css',
            paths.src + '/{app,components}/**/*.js',
            paths.src + '/{app}/{components}/**/*.js',
            paths.src + 'bower_components/**/*',
            'bower.json'
        ], ['inject']);
});

gulp.task('sass:watch', function () {
    gulp.watch(paths.src + '/app/**/*.scss', ['sass']);
});