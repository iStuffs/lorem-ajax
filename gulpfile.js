/* gulp plugins variables*/

const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      rename       = require('gulp-rename'),
      cleanCss     = require('gulp-clean-css'),
      htmlMin      = require('gulp-htmlmin'),
      uglify       = require('gulp-uglify'),
      browserSync  = require('browser-sync'),
      sourcemaps   = require('gulp-sourcemaps'),
      imagemin     = require('gulp-imagemin'),
      babel        = require('gulp-babel'),
      plumber      = require('gulp-plumber'),
      notify       = require("gulp-notify"),
      zip          = require('gulp-zip'),
      gulpif       = require('gulp-if'),
      argv         = require('yargs').argv;


/* tasks declaration*/
function cssTask() {
  return gulp.src('./src/sass/**/*.{sass,scss}')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(gulpif(!argv.production, sourcemaps.init()))
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
      browsers: ['last 6 versions'],
      cascade: false
  }))
  .pipe(cleanCss({
    compatibility: 'ie8'
  }))
  .pipe(rename(function(path){ path.basename += ".min"; }))
  .pipe(gulpif(!argv.production, sourcemaps.write('.')))
  .pipe(gulp.dest('./dist/css'));
};

function htmlTask() {
  return gulp.src('src/*.html')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(gulpif(argv.production, htmlMin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
};

function jsTask() {
  return gulp.src('./src/js/**/*.js')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(babel({ presets: ['@babel/preset-env'] }))
  .pipe(gulpif(argv.production, uglify()))
  .pipe(rename(function(path){ path.basename += ".min"; }))
  .pipe(gulp.dest('./dist/js'));
};

function imgTask() {
  return gulp.src('src/img/**/*.{gif,jpg,png,svg,jpeg}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
};


function refresh(done) {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
  done();
};

gulp.task('build', gulp.series(cssTask, jsTask, htmlTask, imgTask));

/* default task and watch */
gulp.task('watch', gulp.series( 'build', refresh, function () {
  gulp.watch('./src/sass/**/*.{sass,scss}', gulp.series(cssTask));
  gulp.watch('./src/js/**/*.js', gulp.series(jsTask));
  gulp.watch('./src/*.html', gulp.series(htmlTask));
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
  gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
  gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('watch'));
