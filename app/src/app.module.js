(function() {
    'use strict';

    angular.module('churchdeskApp', ['churchdeskApp.core', 'churchdeskApp.users']);

    angular.module('churchdeskApp').config(['$locationProvider',function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
    }]);

})();
