var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');

// static server + watch scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: {
      directory: true,
      baseDir: "./"
    },
    files: "styles.css",
    // httpd-vhosts.conf users:
    // open: "external",
    // host: "es6.test",
    // proxy: "es6.test",
    // port: 3000
  });

  gulp.watch("./scss/*.scss", ['sass']);
  gulp.watch("./*/*.js").on('change', browserSync.reload);
  gulp.watch("./*/*.html").on('change', browserSync.reload);
});

// compile sass & auto-inject into browsers

//sass
gulp.task('sass', function() {
  return gulp.src('./scss/*.scss')
  .pipe(sass().on('error', sass.logError))
//pipe to autoprefixer
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('./public'))
  .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);