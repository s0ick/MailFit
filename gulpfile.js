function defaultTask(cb) {
  // place code for your default task here
  cb();
}
let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var tinypng = require('gulp-tinypng-compress');
var htmlmin = require('gulp-html-minifier2');
 
gulp.task('minify-html', function() {
  gulp.src('./src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
});
 
gulp.task('minify-css', () => {
  return gulp.src('./src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});
gulp.task('js', () => {
  return gulp.src('./src/js/*.min.js')
    .pipe(gulp.dest('dist/js'));
});
gulp.task('move-js', function () {
  gulp.src(['./src/js/*.js', '!./src/js/*.min.js'])
      .pipe(jsmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/js/'));
});
gulp.task('fonts', () => {
  return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});
gulp.task('php', () => {
  return gulp.src('./src/*.php')
    .pipe(gulp.dest('dist/'));
});
gulp.task('php-files', () => {
  return gulp.src('./src/php/*.php')
    .pipe(gulp.dest('dist/php/'));
});
gulp.task('tinypng', function (cb) {
  return gulp.src('./src/img/**/*.{png,jpg,jpeg}')
      .pipe(tinypng({
          key: '42046GHPMsHYfg4r79S6vmV7SkkyW8Dd',
      }))
      .pipe(gulp.dest('dist/img/'));
  cb();
});


exports.default = defaultTask