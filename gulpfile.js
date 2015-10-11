const gulp = require('gulp');
const jscs = require('gulp-jscs');

const JS_FILE_GLOBS = ['gulpfile.js', 'app.js', 'elements/**/*.js'];

gulp.task('lint', () => {
  return gulp.src(JS_FILE_GLOBS)
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
});
