module.exports = function() {
    var app = './app/';
    var build = app + 'build/';
    var src = app + 'src/';
    var styles = app + 'styles/';
    var wiredep = require('wiredep');

    var config = {

        index: app + 'index.html',
        htmltemplates: [
            src + '**/*.html'
        ],
        app: app,
        build: build,
        src: src,
        css: [
            styles + '*.css',
        ],
        js: [
            src + '**/**.module.js',
            src + '**/**.js',
        ],
        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'churchdeskApp.core',
                standAlone: false,
                transformUrl: function(url) {
                	return url.replace('src', '')
                }
            },
            directory: src+'core'
        },
        /**
        * Bower locations
        */
        bower: {
            bowerJson: require('./bower.json'),
            directory: app+'bower_components/'
        },
    };
    return config;
};
