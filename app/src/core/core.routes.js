(function () {
    'use strict';

	angular.module('churchdeskApp.core').config(routeConfig);

	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider, $q) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/core/views/welcome.html',
            });
        $urlRouterProvider.otherwise('/');
    }

})();
