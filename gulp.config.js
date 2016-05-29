module.exports = function() {
    var app = './app/';
    var build = './app/build';
    var scripts = app + 'src/';
    var styles = app + 'styles/';
    var wiredep = require('wiredep');

    var config = {

        index: app + 'index.html',
        htmltemplates: [
            app + '**/*.html',
            '!' + app +'/index.html'
        ],
        app: app,
        build: build,
        scripts: scripts,
        css: [
            styles + '*.css',
        ],
        js: [
            scripts + '**/**.module.js',
            scripts + '**/**.js',
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
            }
        },
        /**
        * Bower locations
        */
        bower: {
            bowerJson: require('./bower.json'),
            directory: app+'bower_components/',
            ignorePath: /^(\.\.\/)*\.\./
        },
    };
    return config;
};
