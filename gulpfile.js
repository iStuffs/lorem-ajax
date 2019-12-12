/* gulp plugins variables*/

const { src, dest, lastRun, series, parallel, watch } = require('gulp')
const sass         = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCss     = require('gulp-clean-css'),
      htmlMin      = require('gulp-htmlmin'),
      uglify       = require('gulp-uglify'),
      browserSync  = require('browser-sync'),
      imagemin     = require('gulp-imagemin'),
      babel        = require('gulp-babel'),
      plumber      = require('gulp-plumber'),
      notify       = require("gulp-notify"),
      gulpif       = require('gulp-if'),
      argv         = require('yargs').argv

const production = argv.production

/* tasks declaration*/
const cssTask = () => {
  return src('./src/sass/**/*.{sass,scss}', { sourcemaps: !production })
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
      cascade: false
  }))
  .pipe(cleanCss({
    compatibility: 'ie11'
  }))
    .pipe(dest('./dist/css', { sourcemaps: '.' }))
}

const htmlTask = () => {
  return src('src/*.html')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(gulpif(production, htmlMin({collapseWhitespace: true})))
    .pipe(dest('dist'))
}

const jsTask = () => {
  return src('./src/js/**/*.js', { sourcemaps: !production })
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(babel({ presets: ['@babel/preset-env'] }))
  .pipe(gulpif(production, uglify()))
  .pipe(dest('./dist/js', { sourcemaps: '.' }))
}

const imgTask = () => {
  return src('src/img/**/*.{gif,jpg,png,svg,jpeg}', { since: lastRun(imgTask) })
    .pipe(imagemin())
    .pipe(dest('dist/img'))
}


const refresh = (done) => {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  })
  done()
}

const build = parallel(cssTask, jsTask, htmlTask, imgTask)

/* default task and watch */
const watcher = series( build, refresh, () => {
  watch('./src/sass/**/*.{sass,scss}', series(cssTask)).on('change', browserSync.reload)
  watch('./src/js/**/*.js', series(jsTask)).on('change', browserSync.reload)
  watch('./src/*.html', series(htmlTask)).on('change', browserSync.reload)
})

module.exports.default = production ? build : watcher
