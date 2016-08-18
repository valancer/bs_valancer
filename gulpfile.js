'use strict';

var	gulp = require('gulp'),
	clean = require('gulp-clean'),
	fileinclude = require('gulp-file-include'),
	sass = require('gulp-sass'),
	buffer = require('vinyl-buffer'),
	csso = require('gulp-csso'),
	iconfont = require('gulp-iconfont'),
	iconfontCss = require('gulp-iconfont-css'),
	imagemin = require('gulp-imagemin'),
	merge = require('merge-stream'),
	spritesmith = require('gulp.spritesmith'),
	autoprefixer = require('gulp-autoprefixer'),
	csscomb = require('gulp-csscomb'),
	newer = require('gulp-newer'),
	jshint = require('gulp-jshint'),
	connect = require('gulp-connect'),
	livereload = require('gulp-livereload'),
	watch = require('gulp-watch'),
	notify = require('gulp-notify'),
	runSequence = require('run-sequence');

var paths = {
	sources: 'sources/**',
	build: 'build/',
	release: 'release/',
	html: {
		src: 'sources/html/*.html',
		base: 'sources/html/includes/',
		dest: 'build/'
	},
	sprites : {
		common: {
			src: 'sources/assets/images/sprites/*.png',
			filter: 'sources/assets/images/sprites/*@2x.png',
			dest: {
				img: 'sources/assets/images/',
				css: 'sources/assets/styles/scss/'
			}
		},
		portal: {
			src: 'sources/assets/images/portal/sprites/*.png',
			dest: {
				img: 'sources/assets/images/portal/',
				css: 'sources/assets/styles/scss/'
			}
		},
		asset: {
			src: 'sources/assets/images/asset/sprites/*.png',
			dest: {
				img: 'sources/assets/images/asset/',
				css: 'sources/assets/styles/scss/'
			}
		},
		metering: {
			src: 'sources/assets/images/metering/sprites/*.png',
			dest: {
				img: 'sources/assets/images/metering/',
				css: 'sources/assets/styles/scss/'
			}
		}
	},
	scss: {
		src: 'sources/assets/styles/scss/**/*.scss',
		dest: 'sources/assets/styles/'
	},
	styles: {
		src: ['sources/assets/styles/*.css', '!sources/assets/styles/*.min.css'],
		dest: 'sources/assets/styles/'
	},
	scripts: {
		src: 'sources/assets/scripts/*.js',
		gulp: 'gulpfile.js',
		vendor: 'sources/assets/scripts/libs/*.js'
	}
};







/* html */
gulp.task('includes', function() {
	gulp.src([paths.html.src])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: paths.html.base,
			indent: true
		}))
		.pipe(gulp.dest(paths.html.dest))
		.pipe(livereload());
});


/* styles */
gulp.task('sprites:common', function () {
	var spriteData = gulp.src(paths.sprites.common.src).pipe(spritesmith({
		retinaSrcFilter: paths.sprites.common.filter,
		imgPath: '../images/sprites.png',
		imgName: 'sprites.png',
		retinaImgPath: '../images/sprites@2x.png',
		retinaImgName: 'sprites@2x.png',
		cssName: '_sprites.scss',
		padding: 6,
		cssVarMap: function (sprite) {
			sprite.name = 'sc-' + sprite.name;
		}
	}));

	var imgStream = spriteData.img
		.pipe(buffer())
		.pipe(imagemin())
		.pipe(gulp.dest(paths.sprites.common.dest.img));

	var cssStream = spriteData.css
		.pipe(gulp.dest(paths.sprites.common.dest.css));

	return merge(imgStream, cssStream).pipe(livereload());
});

gulp.task('sprites:portal', function () {
	var spriteData = gulp.src(paths.sprites.portal.src).pipe(spritesmith({
		imgPath: '../images/portal/portal_sprites.png',
		imgName: 'sprites_portal.png',
		cssName: '_sprites_portal.scss',
		padding: 6,
		cssVarMap: function (sprite) {
			sprite.name = 'sp-' + sprite.name;
		}
	}));

	var imgStream = spriteData.img
		.pipe(buffer())
		.pipe(imagemin())
		.pipe(gulp.dest(paths.sprites.portal.dest.img));

	var cssStream = spriteData.css
		.pipe(gulp.dest(paths.sprites.portal.dest.css));

	return merge(imgStream, cssStream).pipe(livereload());
});

gulp.task('sprites:asset', function () {
	var spriteData = gulp.src(paths.sprites.asset.src).pipe(spritesmith({
		imgPath: '../images/asset/asset_sprites.png',
		imgName: 'sprites_asset.png',
		cssName: '_sprites_asset.scss',
		padding: 6,
		cssVarMap: function (sprite) {
			sprite.name = 'sa-' + sprite.name;
		}
	}));

	var imgStream = spriteData.img
		.pipe(buffer())
		.pipe(imagemin())
		.pipe(gulp.dest(paths.sprites.asset.dest.img));

	var cssStream = spriteData.css
		.pipe(gulp.dest(paths.sprites.asset.dest.css));

	return merge(imgStream, cssStream).pipe(livereload());
});

gulp.task('sprites:metering', function () {
	var spriteData = gulp.src(paths.sprites.metering.src).pipe(spritesmith({
		imgPath: '../images/metering/metering_sprites.png',
		imgName: 'sprites_metering.png',
		cssName: '_sprites_metering.scss',
		padding: 6,
		cssVarMap: function (sprite) {
			sprite.name = 'sm-' + sprite.name;
		}
	}));

	var imgStream = spriteData.img
		.pipe(buffer())
		.pipe(imagemin())
		.pipe(gulp.dest(paths.sprites.metering.dest.img));

	var cssStream = spriteData.css
		.pipe(gulp.dest(paths.sprites.metering.dest.css));

	return merge(imgStream, cssStream).pipe(livereload());
});

var fontName = 'Icons';
gulp.task('iconfont', function(){
	gulp.src(['sources/assets/icons/*.svg'])
		.pipe(iconfontCss({
			fontName: fontName,
			path: 'sources/assets/styles/templates/_icons_template.scss',
			targetPath: '../../styles/scss/_icons.scss',
			fontPath: '../fonts/icons/',
			cssClass: 'icon'
		}))
		.pipe(iconfont({
			fontName: fontName
		}))
		.pipe(gulp.dest('sources/assets/fonts/icons/'));
});

gulp.task('sass', function () {
	return gulp.src(paths.scss.src)
        .pipe(sass({ errLogToConsole: false }))
		// .pipe(sass().on('error', sass.logError))
		.on('error', function(err) {
			notify().write(err);
			this.emit('end');
		})
		.pipe(gulp.dest(paths.scss.dest))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			expand: true,
			flatten: true
		}))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(livereload());
});


gulp.task('csscomb', function() {
	return gulp.src('build/assets/styles/*.css')
		.pipe(csscomb('config/csscomb.json'))
		.pipe(gulp.dest('build/assets/styles/'));
});


/* scripts */
gulp.task('jshint', function() {
  return gulp.src([paths.scripts.gulp, paths.scripts.src])
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')))
    .pipe(livereload());
});


/* files - clean */
gulp.task('clean:build', function () {
	return gulp.src(paths.build, {read: false})
	.pipe(clean());
});
gulp.task('clean:release', function () {
	return gulp.src(paths.release, {read: false})
	.pipe(clean());
});


/* files - copy */
gulp.task('copy:assets', function () {
	return gulp.src(['sources/assets/**', '!**/scss', '!**/scss/**', '!**/psd/**', '!**/sprites', '!**/sprites/**', '!**/templates/', '!**/templates/**', '!**/assets/icons/', '!**/assets/icons/**'])
	.pipe(gulp.dest('build/assets/'));
});
gulp.task('copy:emails', function () {
	return gulp.src('sources/html/email/**')
	.pipe(gulp.dest('build/email/'));
});
gulp.task('copy:scripts', function () {
	return gulp.src('sources/assets/scripts/**')
	.pipe(gulp.dest('build/assets/scripts/'));
});
gulp.task('copy:iconfont', function () {
	return gulp.src(['sources/assets/fonts/icons/**'])
	.pipe(gulp.dest('build/assets/fonts/icons/'));
});
gulp.task('copy:styles', function () {
	return gulp.src('sources/assets/styles/*.css')
	.pipe(gulp.dest('build/assets/styles/'));
});
gulp.task('copy:images', function () {
	return gulp.src(['sources/assets/images/**', '!**/sprites', '!**/sprites/**'])
	.pipe(gulp.dest('build/assets/images/'));
});
gulp.task('copy:release', function () {
	return gulp.src(['build/**'])
	.pipe(gulp.dest('release/'));
});



/* watch */
gulp.task('check', function() {
	return gulp.src([paths.scripts.gulp, paths.scripts.src, paths.scripts.vendor, 'sources/assets/images/*', ])
		.pipe(livereload());
});

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(['sources/html/**/*.html'], ['includes']);
	gulp.watch(['sources/assets/icons/*.svg'], ['iconfont', 'copy:iconfont']);
	gulp.watch(['sources/assets/styles/scss/*.scss'], ['sass', 'copy:styles']);
	gulp.watch(['sources/assets/styles/*.css'], ['sass', 'copy:styles']);
	gulp.watch([paths.scripts.gulp], ['jshint', 'copy:scripts']);
	gulp.watch([paths.scripts.src, paths.scripts.vendor], ['copy:scripts']);
	gulp.watch(['sources/assets/images/*'], ['check', 'copy:images']);
	gulp.watch(['sources/assets/images/sprites/*'], ['sprites:common', 'copy:images']);
	gulp.watch(['sources/assets/images/portal/*'], ['check', 'copy:images']);
	gulp.watch(['sources/assets/images/portal/sprites/*'], ['sprites:portal', 'copy:images']);
	gulp.watch(['sources/assets/images/asset/*'], ['check', 'copy:images']);
	gulp.watch(['sources/assets/images/asset/sprites/*'], ['sprites:asset', 'copy:images']);
	gulp.watch(['sources/assets/images/metering/*'], ['check', 'copy:images']);
	gulp.watch(['sources/assets/images/metering/sprites/*'], ['sprites:metering', 'copy:images']);
});


/* connect */
gulp.task('connect', function () {
	connect.server({
		root: paths.build,
		port: 9001,
		livereload: true
	});
});


gulp.task('sass-build', ['iconfont', 'sprites:common', 'sprites:portal', 'sprites:asset', 'sprites:metering', 'sass'], function() { });
gulp.task('sass-release', ['iconfont', 'sprites:common', 'sprites:portal', 'sprites:asset', 'sprites:metering', 'sass'], function() { });
gulp.task('scripts-build', ['jshint'], function() { });
gulp.task('html-build', ['includes'], function() { });

gulp.task('build', ['clean:build'], function() {
	gulp.run(['sass-build', 'scripts-build', 'html-build', 'copy:emails', 'copy:assets', 'connect', 'watch']);
});

gulp.task('release', function(callback) {
	runSequence('clean:release', ['sass-release', 'scripts-build', 'html-build', 'copy:emails', 'copy:assets'], ['csscomb', 'copy:release'], callback);
});
/*
gulp.task('release', ['clean:release'], function() {
	gulp.run(['sass-release', 'scripts-build', 'html-build', 'copy:emails', 'copy:assets', 'csscomb', 'copy:release']);
});
gulp.task('release-after', [], function() {
	gulp.run(['csscomb', 'copy:release']);
});
*/
