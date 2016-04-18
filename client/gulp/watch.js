'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

gulp.task('watch', ['inject:watch', 'sass:watch', 'sdk:watch']);

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

gulp.task('sdk:watch', function(){
    gulp.watch([paths.sdk + '/dist/*.js'], ['sdk']);
});

gulp.task('sass:watch', function () {
    gulp.watch(paths.src + '/app/**/*.scss', ['sass']);
});