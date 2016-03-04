const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('build', () => {
  const js = $.filter(['**/*.js'], { restore: true });
  return gulp.src('src/**')
    .pipe(js)
    .pipe($.babel())
    .pipe(js.restore)
    .pipe(gulp.dest('lib'));
});
