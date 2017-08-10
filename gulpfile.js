// Include gulp
var gulp         = require('gulp');

// Include Our Plugins
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var jshint       = require('gulp-jshint');
var minifycss    = require('gulp-clean-css');
var scsslint     = require('gulp-scss-lint' );
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var uglify       = require('gulp-uglify');
var gutil        = require('gulp-util');

// This will handle our errors
var onError = function (err) {
    gutil.log(gutil.colors.red(err));
};

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('uncompressed/scss/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'));
});

// Concatenate & Minify JS
gulp.task('js', function() {
    return gulp.src(['uncompressed/js/jquery/jquery.js', 'uncompressed/js/vendor/*.js', 'uncompressed/js/custom/*.js'])
    .pipe( plumber({
        errorHandler: onError
    }) )
    .pipe( concat( 'app.js' ) )
    .pipe( gulp.dest( 'assets/js' ) )
    .pipe( rename( 'app.min.js' ) )
    .pipe( uglify() )
    .pipe( gulp.dest( 'assets/js' ) );
});

// Lets lint our JS
gulp.task('js-lint', function() {
    return gulp.src('uncompressed/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Lets lint our CSS
gulp.task( 'scss-lint', function() {
    gulp.src( 'uncompressed/scss/*.scss' )
    .pipe( scsslint({ 'config': 'defaultLint.yml' }) );
});

// Watch Files For Changes
gulp.task('watch', function() {

    gulp.watch('uncompressed/js/*.js', ['js']);
    gulp.watch('uncompressed/scss/*.scss', ['sass']);
    gutil.log('Watching source files for changes... Press ' + gutil.colors.cyan('CTRL + C') + ' to stop.');

});

// Default Task
gulp.task('default', ['watch']);
