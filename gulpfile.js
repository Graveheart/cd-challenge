var gulp = require('gulp');
var config = require('./gulp.config')();

var $ = require('gulp-load-plugins')({lazy: true});

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
        .pipe($.inject(gulp.src(config.build+'app.js', {read: false}),
         // Options
         {
             ignorePath: '/app',
             addRootSlash: true
         }))
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

    var templateCache = config.templateCache.directory + config.templateCache.file;
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
        .pipe(gulp.dest(config.templateCache.directory));
});

gulp.task('build', ['optimize', 'templatecache', 'watch']);

gulp.task('default', ['build']);

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
