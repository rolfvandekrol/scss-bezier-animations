var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

gulp.task('styles', function () {
  gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('default', ['styles']);

gulp.task('watch', function () {
  watch('scss/**/*', function() {
    gulp.start('default');
  });
});