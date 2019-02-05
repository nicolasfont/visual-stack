const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const build = watch => {
  const js = $.filter(['**/*.js'], { restore: true });

  const src = gulp.src('src/**');
  const plumbed = watch
    ? src.pipe($.plumber())
    : src;

  return plumbed
    .pipe(js)
    .pipe($.babel())
    .pipe(js.restore)
    .pipe(gulp.dest('lib'));
};

gulp.task('build', () => build(false));
gulp.task('build:watch', () => build(true));

gulp.task('watch', () =>
  gulp.watch('src/**', gulp.series('build:watch')));
