var gulp = require('gulp');
var config = require('./gulp.config')();

var $ = require('gulp-load-plugins')({lazy: true});

//Wire up the bower css&js into the html
gulp.task('wiredep', function() {
    var options = config.bower;
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index) //index.html
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js))) //bower component files
        .pipe(gulp.dest(config.app));
});

gulp.task('inject', function() {
    var options = config.bower;
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index) //index.html
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.css, {read: false}),
            // Options
            {
                ignorePath: '/app',
                addRootSlash: true
            })) //css files
        .pipe(gulp.dest(config.app));
});

gulp.task('concat', function() {
    return gulp.src(config.js, {base: './'})
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.concat('app.js'))
        .pipe(gulp.dest(config.build))
        .pipe($.uglify({
           mangle: false
        }))
        .pipe($.stripDebug())
        .pipe($.concat('app.min.js'))
        .pipe(gulp.dest(config.build))
        .pipe($.notify({ message: 'Finished minifying JavaScript'}));
});

gulp.task('watch', function() {
    gulp.watch([config.js], ['concat']);

    gulp.watch([config.htmltemplates], ['templatecache']);
});

gulp.task('optimize', ['inject'], function() {
    log('Optimizing the javascript, css, html');

    var templateCache = config.temp + config.templateCache.file;
    var cssFilter = $.filter('**/*.css');
    var jsFilter = $.filter('**/*.js');

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe($.useref())
        .pipe(gulp.dest(config.app));
});

gulp.task('templatecache', function() {
    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({empty: true}))
            .pipe($.angularTemplatecache(
                config.templateCache.file,
                config.templateCache.options
            ))
        .pipe(gulp.dest(config.scripts+'core'));
});

gulp.task('build', ['inject', 'templatecache']);

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
