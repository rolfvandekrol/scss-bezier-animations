var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

gulp.task('style', function () {
  gulp.src('scss/style.scss')
    .pipe(sass({functions: require('./math.js')}).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('demo', function () {
  gulp.src('scss/demo.scss')
    .pipe(sass({functions: require('./math.js')}).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('default', ['style', 'demo']);

gulp.task('watch', ['default'], function () {
  watch('scss/**/*', function() {
    gulp.start('default');
  });
});