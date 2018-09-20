var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');

gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(cleanCSS())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('css', function () {
	return gulp.src('app/css/**/*')
		.pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function () {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function () {
	return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('javascript', function () {
	return gulp.src('app/js/**/*')
		.pipe(uglify({
			compress:{
				sequences:false
			}
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('useref', function () {
	return gulp.src('app/*.html')
		//.pipe(useref())
		//.pipe(gulpIf('*.js', uglify()))
		.pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function () {
	return del.sync('dist');
});

gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('watch', ['browserSync', 'sass'], function () {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('build', function (callback) {
	runSequence('clean:dist', 'sass', ['css', 'fonts', 'images', 'javascript'], 'useref', callback);
});

gulp.task('default', function (callback) {
	runSequence(['watch'], callback);
});

gulp.task('push', function (callback) {
	runSequence(['build'], shell.task('scp -r dist/* tilde.town:~/public_html/', callback));
});